// ==================== ЗАВДАННЯ 10.5 ====================

/**
 * Створіть систему з fallback серверами
 * Спробуйте основний сервер, якщо він не відповідає за 1 секунду
 * переключіться на резервний
 */
function primaryServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Primary data'), 2000); // Відповідає 2 сек
    });
}

function backupServer() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Backup data'), 500); // Відповідає 0.5 сек
    });
}

/**
 * Спробуйте отримати дані:
 * 1. Спочатку з primary
 * 2. Якщо primary не відповідає за 1000ms - використайте backup
 * 3. Поверніть {source: 'primary'|'backup', data: string}
 * * @returns {Promise<{source: string, data: string}>}
 */
function getDataWithFallback() {
    // 1. Створюємо проміс-таймер, який відхиляється (reject) рівно через 1 секунду
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Primary server timeout')), 1000);
    });

    // 2. Запускаємо гонку між основним сервером та нашим таймером
    const primaryRequest = primaryServer().then(data => ({
        source: 'primary',
        data: data
    }));

    return Promise.race([primaryRequest, timeout])
        // Якщо primary встиг швидше ніж за 1 сек, Promise.race успішно завершується
        // Якщо таймер спрацював першим, Promise.race кидає помилку, і ми йдемо в catch
        .catch(() => {
            console.log('Основний сервер не встиг, переключаємось на резервний...');
            // 3. Викликаємо резервний сервер (fallback)
            return backupServer().then(data => ({
                source: 'backup',
                data: data
            }));
        });
}

// Перевірка:
getDataWithFallback()
    .then(result => console.log('Тест 10.5:', result));

// Очікується: { source: 'backup', data: 'Backup data' }