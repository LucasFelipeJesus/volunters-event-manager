import { supabase } from '../lib/supabase'

/**
 * Utilitários simplificados para administração
 */

/**
 * Verificar se o usuário atual é administrador
 */
export const isCurrentUserAdmin = async (): Promise<boolean> => {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return false
        }

        const { data: userData, error } = await supabase
            .from('users')
            .select('role, is_active')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('Erro ao verificar role do usuário:', error)
            return false
        }

        return userData?.role === 'admin' && userData?.is_active === true
    } catch (error) {
        console.error('Erro ao verificar admin:', error)
        return false
    }
}

/**
 * Configurar usuário existente como administrador
 */
export const promoteToAdmin = async (userId: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('users')
            .update({
                role: 'admin',
                is_active: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId)

        if (error) {
            console.error('Erro ao promover usuário a admin:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Erro ao promover usuário:', error)
        return false
    }
}

/**
 * Rebaixa um capitão para voluntário e aplica mudanças nas equipes onde ele está alocado.
 * - Mantém o usuário em apenas uma equipe (a mais antiga) como voluntário;
 * - Remove/encerra sua participação nas demais equipes;
 * - Para equipes cujo `captain_id` era esse usuário, tenta eleger um novo capitão entre membros ativos (por ordem de entrada) ou define `captain_id` como null.
 */
export const demoteCaptain = async (userId: string): Promise<boolean> => {
    try {
        // 1) Buscar participações ativas do usuário ordenadas por joined_at (asc)
        const { data: memberships, error: mErr } = await supabase
            .from('team_members')
            .select('*')
            .eq('user_id', userId)
            .in('status', ['active', 'confirmed'])
            .order('joined_at', { ascending: true })

        if (mErr) throw mErr

        const keepId = memberships && memberships.length > 0 ? memberships[0].id : null

        // 2) Para todas as participações: se for a primeira, garantir role_in_team = 'volunteer', caso contrário remover
        for (const mem of (memberships || [])) {
            if (mem.id === keepId) {
                await supabase.from('team_members').update({ role_in_team: 'volunteer' }).eq('id', mem.id)
            } else {
                await supabase.from('team_members').update({ status: 'removed', left_at: new Date().toISOString() }).eq('id', mem.id)
            }
        }

        // 3) Para equipes onde era captain_id, eleger substituto
        const { data: teamsAsCaptain, error: tErr } = await supabase
            .from('teams')
            .select('id')
            .eq('captain_id', userId)

        if (tErr) throw tErr

        for (const t of (teamsAsCaptain || [])) {
            // buscar primeiro membro ativo (excluindo o usuário) por joined_at
            const { data: candidates } = await supabase
                .from('team_members')
                .select('user_id, id')
                .eq('team_id', t.id)
                .eq('status', 'active')
                .neq('user_id', userId)
                .order('joined_at', { ascending: true })

            if (candidates && candidates.length > 0) {
                const newCaptainUserId = candidates[0].user_id
                const candidateMemberId = candidates[0].id
                // atualizar teams.captain_id
                await supabase.from('teams').update({ captain_id: newCaptainUserId, updated_at: new Date().toISOString() }).eq('id', t.id)
                // atualizar role_in_team do membro promovido
                await supabase.from('team_members').update({ role_in_team: 'captain' }).eq('id', candidateMemberId)
            } else {
                // nenhum candidato: limpar captain_id
                await supabase.from('teams').update({ captain_id: null, updated_at: new Date().toISOString() }).eq('id', t.id)
            }
        }

        // 4) Atualizar usuário para role 'volunteer'
        await supabase.from('users').update({ role: 'volunteer', updated_at: new Date().toISOString() }).eq('id', userId)

        return true
    } catch (error) {
        console.error('Erro ao rebaixar capitão:', error)
        return false
    }
}

/**
 * Desativa um usuário: remove de todas equipes e cancela inscrições em eventos.
 * Se o usuário era capitão de equipes, tenta eleger substitutos (como em demoteCaptain).
 */
export const deactivateUser = async (userId: string): Promise<boolean> => {
    try {
        // 1) Remover de todas as equipes (marca removed)
        await supabase.from('team_members').update({ status: 'removed', left_at: new Date().toISOString() }).eq('user_id', userId)

        // 2) Eleger substitutos para equipes que tinham este user como captain
        const { data: teamsAsCaptain, error: tErr } = await supabase
            .from('teams')
            .select('id')
            .eq('captain_id', userId)

        if (tErr) throw tErr

        for (const t of (teamsAsCaptain || [])) {
            const { data: candidates } = await supabase
                .from('team_members')
                .select('user_id, id')
                .eq('team_id', t.id)
                .eq('status', 'active')
                .neq('user_id', userId)
                .order('joined_at', { ascending: true })

            if (candidates && candidates.length > 0) {
                const newCaptainUserId = candidates[0].user_id
                const candidateMemberId = candidates[0].id
                await supabase.from('teams').update({ captain_id: newCaptainUserId, updated_at: new Date().toISOString() }).eq('id', t.id)
                await supabase.from('team_members').update({ role_in_team: 'captain' }).eq('id', candidateMemberId)
            } else {
                await supabase.from('teams').update({ captain_id: null, updated_at: new Date().toISOString() }).eq('id', t.id)
            }
        }

        // 3) Cancelar inscrições em eventos (pending/confirmed)
        await supabase.from('event_registrations').update({ status: 'cancelled' }).eq('user_id', userId).in('status', ['pending', 'confirmed'])

        // 4) Desativar usuário
        await supabase.from('users').update({ is_active: false, updated_at: new Date().toISOString() }).eq('id', userId)

        return true
    } catch (error) {
        console.error('Erro ao desativar usuário:', error)
        return false
    }
}
