import React from "react";
import "./Card.css"

class Card extends React.Component {
    // создаем конструктор для использования state и отслеживания состояния открытой
    // или закрытой карточки - по умолчанию закрытая
    constructor() {
        super();
        this.state = {isOpened: false};
    }

    //создаем метод для обработки клика по карточке с вызовом метода из родительского компонента,
    //также меняем состояние карточки isOpened
    cardClickHandler(item) {
        this.setState({isOpened: !this.state.isOpened});
        this.props.onChoice(item);
    }

    render() {
        return (
            // переносим код из App.js с изменениями, добавляем обработчик события по клику,
            // сохранеям контекст через bind и передаем вторым параметром данные карточки
            // this.props.item
            <div className={'card ' + (this.state.isOpened ? 'opened' : 'closed')}
                 onClick={this.cardClickHandler.bind(this, this.props.item)}>
                <div className="card-inner card-front">
                    <img src={'/images/' + this.props.item.image} alt={this.props.item.name}/>
                </div>
                <div className="card-inner card-back">
                    <img src={'/images/question.svg'} alt="question mark"/>
                </div>
            </div>
        )
    }
}

export default Card;