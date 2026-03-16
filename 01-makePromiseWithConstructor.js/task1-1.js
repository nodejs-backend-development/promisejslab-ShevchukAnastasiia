/**
 * ЗАВДАННЯ 1: Створення промісів з конструктором
 * * Проміси можуть бути у трьох станах: pending, fulfilled, rejected
 * Ви повинні навчитися створювати проміси вручну
 */

// ==================== ЗАВДАННЯ 1.1 ====================

/**
 * Створіть проміс, який resolve або reject залежно від параметра
 * * @param {boolean} itShouldResolve - Чи повинен проміс успішно виконатися
 * @returns {Promise<string, string>}
 */
function makePromiseWithConstructor(itShouldResolve) {
    // Повертаємо новий об'єкт Promise
    return new Promise((resolve, reject) => {
        // Перевіряємо умову
        if (itShouldResolve === true) {
            resolve('Success!'); // Переводимо проміс у стан fulfilled (успішно)
        } else {
            reject('Failed!');   // Переводимо проміс у стан rejected (помилка)
        }
    });
}

// Перевірка:
makePromiseWithConstructor(true)
    .then(result => console.log(' Тест 1.1 (resolve):', result))
    .catch(error => console.log('   Помилка:', error));

makePromiseWithConstructor(false)
    .then(result => console.log('   Не повинно виконатися'))
    .catch(error => console.log(' Тест 1.1 (reject):', error));