import './App.css';
// добавляем после создания файла config.js
import config from "./config";
// добавляем при замене использования function на class
import React from 'react';
// добавляем импорт компонента Card
import Card from "./components/Card";
// добавляем popup из библиотеки
import Popup from 'reactjs-popup';

// меняем использование function на class, добавляем функцию render(){} и размещаем в нее весь код
// function App() {
class App extends React.Component {
    // создаем контсруктор для использования state и отслеживания изменений, в который сразу размещаем
    // карточки, используемые в новой игре, позже добавляем состояние popup
    constructor() {
        super();
        // при реализации функционала запуска игры меняем
        // this.state = {cards: this.prepareCards(), clicks: 0, isPopupOpened: false};
        this.state = {cards: [], clicks: 0, isPopupOpened: false};
    }

    // вызываем запуск игры в самом начале
    componentDidMount() {
        this.startGame();
    }

    // в самом конце создаем метод для запуска игры в самом начале или после завершения очередной
    startGame() {
        this.setState({
            cards: this.prepareCards(), clicks: 0, isPopupOpened: false
        });
    }

    // создаем метод подготовки карточек, в котором получаем массив из двух массивов с карточкамиб
    // поскольку они используются каждая по 2 раза
    prepareCards() {
        let id = 1;
        return [...config.cards, ...config.cards]
            //перемешиваем карточки в массивах
            .sort(() => Math.random() - 0.5)
            // перезадаем id, чтобы не было дублирования одного id у двух одинаковых карточек
            // добавляем флаг isOpened для передачи состояния в дочерний компонент и флаг
            // выполненного задания - нахождения пары одинаковых карточек isCompleted
            .map(item => ({...item, id: id++, isOpened: false, isCompleted: false}));
    };

    // создаем функцию для принятия карточки, на которую нажали
    choiceCardHandler(openedItem) {
        // при нажатии на карточку при двух открытых следующая открываться не будет
        if (openedItem.isCompleted || this.state.cards.filter(item => item.isOpened).length >= 2) {
            return;
        }

        // изменение состояния при клике
        this.setState({
            cards: this.state.cards.map(item => {
                return item.id === openedItem.id ? {...item, isOpened: true} : item
            })
        }, () => {
            this.processChoosingCards();
        });

        // создаем подсчет количества кликов
        // this.setState({clicks: this.state.clicks + 1});
        this.setState({
            clicks: this.state.clicks + 1
        });
    }

    // метод обработки выбранных карточек
    processChoosingCards() {
        const openedCards = this.state.cards.filter(item => item.isOpened);
        if (openedCards.length === 2) {
            // если карточки одинаковые, они считаются открытыми в игре
            if (openedCards[0].name === openedCards[1].name) {
                this.setState({
                        cards: this.state.cards.map(item => {
                            if (item.id === openedCards[0].id || item.id === openedCards[1].id) {
                                item.isCompleted = true;
                            }

                            item.isOpened = false;
                            return item;
                            // вызываем функцию проверки открытия всех карточек
                        })
                    }, () => {
                        this.checkForAllCompleted();
                    }
                )
                // если карточки не одинаковые, то закрываем их
            } else {
                setTimeout(() => {
                    this.setState({
                        cards: this.state.cards.map(item => {
                            item.isOpened = false;
                            return item;
                        })
                    })
                }, 1000)
            }
        }
    }

    // метод проверки завершения игры
    checkForAllCompleted() {
        if (this.state.cards.every(item => item.isCompleted)) {
            this.setState({
                isPopupOpened: true
            });
        }
    }

    // метод закрытия popup
    closePopup() {
        this.setState({
            isPopupOpened: false
        });
        // вызываем запуск новой игры после завершения очередной игры
        this.startGame();
    }

    render() {
        return (
            <div className="App">
                <header className="header">Memory Game</header>
                <div className="game">
                    <div className="score">
                        Нажатий: {this.state.clicks}
                    </div>
                    <div className="cards">
                        {
                            this.state.cards.map(item => (
                                //добавляем для передачи в дочерний компонент метода и позже флага состояния
                                // и флага открытия
                                <Card item={item} key={item.id} isShowed={item.isOpened || item.isCompleted}
                                      onChoice={this.choiceCardHandler.bind(this)}/>
                                //верстка переносится в компонент Card
                                // <div className="card" key={item.id}>
                                //     <img src={'/images/' + item.image} alt={item.name}/>
                                // </div>
                            ))
                        }
                    </div>
                </div>
                {/*добавляем код из библиотеки popup*/}
                <Popup open={this.state.isPopupOpened} closeOnDocumentClick onClose={this.closePopup.bind(this)}>
                    <div className="modal">
                        <span className="close" onClick={this.closePopup.bind(this)}>
                            &times;
                        </span>
                        Игра завершена! Ваш результат: {this.state.clicks} кликов!
                    </div>
                </Popup>
            </div>
        );
    }
}

export default App;
