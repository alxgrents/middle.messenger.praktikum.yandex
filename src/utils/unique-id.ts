let currentIndex = 0;

/**
 * Генерация уникального строкового id на коленке
 * до 2^40 раз использования это точно уникальный идентификатор
 */
function createUniqueId(): string {
    currentIndex += 1;
    const time = Date.now().toString(16).padStart(10, '0').slice(0, 10);
    const index = currentIndex.toString(16).padStart(10, '0').slice(0, 10);

    return time.split('').map((char, i) => char + index[i]).join('');
}

export default createUniqueId;
