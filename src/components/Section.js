export class Section {
  constructor({items, renderer}, containerSelector) {
    this.intialCards = items;
    this._renderer = renderer;
    this.elementsSection = document.querySelector(containerSelector);
  }

  initialRender(){
// Загрузка предустановленных карточек
      this.intialCards.forEach((item) =>{
        // Добавление карточки
        this.addItem(this._renderer(item));
      });
  }
  addItem(newCard){
    this.elementsSection.prepend(newCard)
  }

}
