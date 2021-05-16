//Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
// YES - Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// YES - Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// YES - Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
// YES - Содержит публичный метод, который отвечает за отрисовку всех элементов.
// YES - Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// YES - Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.

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
