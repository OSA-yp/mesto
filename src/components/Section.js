export class Section {
  constructor(renderer, containerSelector) {
    // Класс ранее сделанный по заданию в проектной работе 8 теперь доработан в связи асинхронностью загрузки карточек
    this._renderer = renderer;
    this.elementsSection = document.querySelector(containerSelector);

  }

  initialRender(items){
// Загрузка предустановленных карточек
    items.forEach((item) =>{
        // Добавление карточки
        this.addItem(this._renderer(item));

      });
  }
  addItem(newCard){

    this.elementsSection.prepend(newCard)
  }

}
