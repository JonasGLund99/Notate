export function formatDate(dateString: string) : string {
    return new Date(dateString).toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
}