// ==================== ЗАВДАННЯ 10.4 ====================

/**
 * Створіть функцію, яка конкурує кілька джерел даних
 * і повертає першу успішну відповідь
 * Але якщо всі джерела падають - reject
 */
function unreliableSource(name, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve({ source: name, data: 'Success!' });
            }
        }, delay);
    });
}

/**
 * Спробуйте отримати дані з кількох джерел
 * Поверніть перше успішне
 * * @returns {Promise<{source: string, data: string}>}
 */
function getDataFromAnySource() {
    // Створюємо 3 джерела згідно з умовами
    const sourceA = unreliableSource('Source A', 300, true);
    const sourceB = unreliableSource('Source B', 500, false);
    const sourceC = unreliableSource('Source C', 200, true);

    const sources = [sourceA, sourceB, sourceC];
    let errorsCount = 0; // Лічильник помилок

    // Функція-обгортка для обробки помилок кожного промісу
    const handleFailure = (promise) => {
        return promise.catch(err => {
            errorsCount++;
            // Якщо це останнє джерело і воно теж впало - відхиляємо гонку
            if (errorsCount === sources.length) {
                return Promise.reject(new AggregateError([err], 'All sources failed'));
            }
            // ТРЮК: Повертаємо проміс, який НІКОЛИ не завершується (зависає).
            // Це дозволяє йому "вибути" з гонки, даючи шанс іншим джерелам.
            return new Promise(() => {});
        });
    };

    // Запускаємо Promise.race() з обгорнутими промісами
    return Promise.race(sources.map(handleFailure));
}

// Перевірка:
getDataFromAnySource()
    .then(result => console.log('Тест 10.4:', result))
    .catch(err => console.error('Помилка 10.4:', err.message));

// Очікується: { source: 'Source B', data: 'Success!' }