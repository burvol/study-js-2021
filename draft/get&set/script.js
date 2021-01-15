'use strict';

function User(fullName) {

    this.fullName = fullName;
    // this.firstName = this.fullName.split(' ')[0];
    // this.lastName = this.fullName.split(' ')[1];

    // this.getFirstName = function() {
    //     return this.firstName;
    // };

    // this.setFirstName = function(value) {
    //     this.firstName = value;
    //     this.fullName = `${this.firstName} ${this.lastName}`;
    // };

    // this.getLastName = function() {
    //     return this.lastName;
    // };

    // this.setLastName = function(value) {
    //     this.lastName = value;
    //     this.fullName = `${this.firstName} ${this.lastName}`;
    // };

    // Object.defineProperties(this, {
    //     firstName: {
    //         get: function() {
    //             return this.fullName.split(' ')[0];
    //         },
    //         set: function(newFirstName) {
    //             this.fullName = `${newFirstName} ${this.lastName}`;
    //         },
    //     },

    //     lastName: { 
    //         get: function() {
    //             return this.fullName.split(' ')[1];
    //         },
    //         set: function(newLastName) {
    //             this.fullName = `${this.firstName} ${newLastName}`;
    //         }
    //     },
    // })
}

User.prototype = Object.defineProperties(User, {
    firstName: {
        get: function() {
            return this.fullName.split(' ')[0];
        },

        set: function(newFirstName) {
            this.fullName = `${newFirstName} ${this.lastName}`;
        },
    },

    lastName: { 
        get: function() {
            return this.fullName.split(' ')[1];
        },
        set: function(newLastName) {
          this.fullName = `${this.firstName} ${newLastName}`;
        }
    },
})



const vasya = new User("Василий Попкин");

//--------
console.log(vasya);
console.log(vasya.firstName);
console.log(vasya.firstName = 'Biban');
console.log(vasya);

// чтение firstName/lastName
// console.log( vasya.firstName ); // Василий
// console.log( vasya.lastName ); // Попкин

// запись в lastName
// vasya.lastName = 'Сидоров';

// console.log( vasya.fullName ); // Василий Сидоров