// ==================== ЗАВДАННЯ 11.5 ====================

/**
 * Пакетна обробка даних з детальним звітом
 * Для кожного елемента треба виконати кілька операцій
 */
function validateData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value < 0) {
                reject(new Error('Negative value'));
            } else {
                resolve({ ...data, validated: true });
            }
        }, 50);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value > 100) {
                reject(new Error('Value too large'));
            } else {
                resolve({ ...data, processed: true, result: data.value * 2 });
            }
        }, 50);
    });
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Зменшив шанс помилки для більш передбачуваних результатів
            if (Math.random() > 0.8) {
                reject(new Error('Database error'));
            } else {
                resolve({ ...data, saved: true });
            }
        }, 50);
    });
}

/**
 * Для кожного item виконайте всі три операції
 * Використайте Promise.allSettled() на двох рівнях:
 * 1. Для операцій над одним item
 * 2. Для всіх items
 * * @param {object[]} items 
 * @returns {Promise<{totalItems: number, fullyProcessed: number, partiallyProcessed: number, failed: number, details: object[]}>}
 */
async function processBatchWithDetails(items) {
    // 1. Створюємо масив промісів для кожного item
    const itemPromises = items.map(async (item) => {
        // РІВЕНЬ 1: Запускаємо 3 операції для одного item одночасно
        const operations = [
            validateData(item),
            processData(item),
            saveData(item)
        ];
        
        // Чекаємо завершення всіх трьох операцій для цього конкретного item
        const opResults = await Promise.allSettled(operations);
        
        // Рахуємо скільки операцій пройшло успішно
        const fulfilledCount = opResults.filter(r => r.status === 'fulfilled').length;
        
        let status = 'failed';
        if (fulfilledCount === 3) status = 'fullyProcessed';
        else if (fulfilledCount > 0) status = 'partiallyProcessed';
        
        // Повертаємо звіт по одному item
        return {
            itemId: item.id,
            status: status,
            operations: opResults
        };
    });

    // РІВЕНЬ 2: Чекаємо завершення обробки ВСІХ items
    const batchResults = await Promise.allSettled(itemPromises);

    // 2. Збираємо фінальну статистику
    const report = {
        totalItems: items.length,
        fullyProcessed: 0,
        partiallyProcessed: 0,
        failed: 0,
        details: []
    };

    batchResults.forEach(result => {
        if (result.status === 'fulfilled') {
            const itemData = result.value;
            // Збільшуємо відповідний лічильник у звіті
            report[itemData.status]++;
            report.details.push(itemData);
        } else {
            // Якщо сама функція обробки item впала (що малоймовірно в нашому коді)
            report.failed++;
            report.details.push({ error: result.reason });
        }
    });

    return report;
}

// Перевірка:
const dataItems = [
    { id: 1, value: 10 },
    { id: 2, value: -5 },   // впаде на validateData
    { id: 3, value: 50 },
    { id: 4, value: 150 },  // впаде на processData
    { id: 5, value: 30 }
];

processBatchWithDetails(dataItems)
   .then(report => {
        console.log('Тест 11.5: Batch Processing Report');
        console.log(report);
    });