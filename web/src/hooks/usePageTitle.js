import { useEffect } from 'react';
import { BRAND } from '@/domain/rubric';
export function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · ${BRAND}` : `${BRAND} · Every commit counts`;
    }, [title]);
}
