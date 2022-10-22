export function bytesToSize(bytes: number): string {
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0 Kb';
    const i = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes.length - 1
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
