// Kontaktlarni joylash uchun bo'sh array ochamiz
var contacts = [];


// DOM
var elNewContactForm = document.querySelector('.js-new-contact-form');
var elNewContactNameInput = elNewContactForm.querySelector('.js-new-contact-name-input');
var elNewContactRelationshipInput = elNewContactForm.querySelector('.js-new-contact-relationship-input');
var elNewContactPhoneInput = elNewContactForm.querySelector('.js-new-contact-phone-input');

var elContacts = document.querySelector('.contacts');
var elContactsList = elContacts.querySelector('.contacts__list');



function addContact() {
  // Add contact to contacts array
  contacts.push({
  name: elNewContactNameInput.value.trim(),
  relationship: elNewContactRelationshipInput.value.trim(),
  phone: elNewContactPhoneInput.value.trim()
  });

      // Reset inputs
      elNewContactNameInput.value = '';
      elNewContactRelationshipInput.value = '';
      elNewContactPhoneInput.value = '';
};

function showContacts(){
  elContactsList.innerHTML = '';
  var elContactsFragment = document.createDocumentFragment();

  var elContactsTemplate = document.querySelector('#contacts-template').content;
  contacts.forEach(function (contact, index) {
    var elContactItem = elContactsTemplate.cloneNode(true);

    elContactItem.querySelector('.contact-title').textContent = contact.name;
    elContactItem.querySelector('.contact-relationship ').textContent = contact.relationship;
    elContactItem.querySelector('.contact-phone').textContent = contact.phone;
    elContactItem.querySelector('.contact-phone').href = 'tel:' + (contact.phone);
    elContactItem.querySelector('.contact-phone').dataset.index = index;

    elContactsFragment.appendChild(elContactItem); 
  })

  elContactsList.appendChild(elContactsFragment);


}

// Form bo'lsa
if (elNewContactForm) {
  elNewContactForm.addEventListener('submit', function (evt) {
    evt.preventDefault();  
  


    var find = contacts.findIndex(function (tell) {
        return tell.phone === elNewContactPhoneInput.value;
      });

    if (find > -1) {
      elNewContactPhoneInput.classList.add('is-invalid')
      return;
    }else {
      elNewContactPhoneInput.classList.remove('is-invalid')
    }

    addContact();

    showContacts();
  });
}
// Form submitda amal bajariladi

function deletecontact(index) {
  contacts.splice(index, 1);
}

if (elContactsList) {
  elContactsList.addEventListener('click', function(evt) {
    if (evt.target.matches('.contact-btn')) {
      deletecontact(Number(evt.target.dataset.index));
      showContacts();
    };
  });
};