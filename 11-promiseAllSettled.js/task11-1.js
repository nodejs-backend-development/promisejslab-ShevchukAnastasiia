// ==================== ЗАВДАННЯ 11.1 ====================

/**
 * Використайте Promise.allSettled() для обробки масиву промісів
 * Порахуйте скільки успішних і скільки невдалих
 */
function analyzeResults(promises) {
    return Promise.allSettled(promises)
        .then(results => {
            // Рахуємо кількість успішних промісів (статус 'fulfilled')
            const successfulCount = results.filter(result => result.status === 'fulfilled').length;
            
            // Рахуємо кількість промісів з помилкою (статус 'rejected')
            const failedCount = results.filter(result => result.status === 'rejected').length;

            // Повертаємо об'єкт із потрібною статистикою та оригінальними результатами
            return {
                successful: successfulCount,
                failed: failedCount,
                results: results
            };
        });
}

// Перевірка:
const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log('Тест 11.1:', stats);
        // Очікується: { successful: 3, failed: 2, results: [ { status: 'fulfilled', value: 1 }, ... ] }
    });