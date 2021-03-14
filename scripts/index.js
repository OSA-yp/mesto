
// событие по клик на кнопке редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);

// событие по клику на крестик попапа
let closeButton = document.querySelector('.popup__close');
closeButton.addEventListener('click', closePopup);

// событие по кнопке сохранить
let popupForm = document.querySelector('.popup__form');
popupForm.addEventListener('submit', formSubmitHandler);

// обработчик сабмита
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  savePopup();  // закрываем попап с сохранением
}




// открыть попап
function openPopup(){
  let popup = document.querySelector('.popup');

  let nameForEdit = document.querySelector('.profile__name');
  let nameInPopup = document.querySelector('.popup__field_purpose_name');

  nameInPopup.value = nameForEdit.textContent;


  let jobForEdit = document.querySelector('.profile__job');
  let jobInPopup = document.querySelector('.popup__field_purpose_job');

  jobInPopup.value = jobForEdit.textContent;

  popup.classList.remove('popup_hiden');

}

// закрыть попап с сохранением
function savePopup(){

  let popup = document.querySelector('.popup');

  let nameForEdit = document.querySelector('.profile__name');
  let nameInPopup = document.querySelector('.popup__field_purpose_name');

  nameForEdit.textContent = nameInPopup.value;


  let jobForEdit = document.querySelector('.profile__job');
  let jobInPopup = document.querySelector('.popup__field_purpose_job');

  jobForEdit.textContent = jobInPopup.value;


  popup.classList.add('popup_hiden');
}

// закрыть попап без сохранения
function closePopup(){
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_hiden');
}






