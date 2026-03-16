// ==================== ЗАВДАННЯ 1.5 ====================

/**
 * Створіть функцію, яка перевіряє вік користувача
 *
 * - age < 0: reject 'Invalid age'
 * - age < 18: reject 'Too young'
 * - age >= 18 та age < 65: resolve {age, category: 'adult'}
 * - age >= 65: resolve {age, category: 'senior'}
 * * @param {number} age 
 * @returns {Promise<{age: number, category: string}, string>}
 */
function checkAge(age) {
    // Повертаємо новий проміс
    return new Promise((resolve, reject) => {
        // Проходимо по умовах за допомогою if / else if
        if (age < 0) {
            reject('Invalid age');
        } else if (age < 18) {
            reject('Too young');
        } else if (age < 65) {
            // Передаємо об'єкт у resolve. Синтаксис {age, ...} ідентичний {age: age, ...}
            resolve({ age, category: 'adult' }); 
        } else {
            resolve({ age, category: 'senior' });
        }
    });
}

// Перевірка:
checkAge(25).then(console.log).catch(console.error); // Виведе: { age: 25, category: 'adult' }
checkAge(70).then(console.log).catch(console.error); // Виведе: { age: 70, category: 'senior' }
checkAge(15).then(console.log).catch(console.error); // Виведе помилку: Too young
checkAge(-5).then(console.log).catch(console.error); // Виведе помилку: Invalid age