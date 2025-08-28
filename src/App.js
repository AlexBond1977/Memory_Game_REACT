import './App.css';
// добавляем после создания файла config.js
import config from "./config";
// добавляем при замене использования function на class
import React from 'react';
// добавляем импорт компонента Card
import Card from "./components/Card";

// меняем использование function на class, добавляем функцию render(){} и размещаем в нее весь код
// function App() {
class App extends React.Component {
    // создаем контсруктор для использования state и отслеживания изменений, в который сразу размещаем
    // карточки, используемые в новой игре
    constructor() {
        super();
        this.state = {cards: this.prepareCards(), clicks: 0};
    }

    // создаем метод подготовки карточек, в котором получаем массив из двух массивов с карточкамиб
    // поскольку они используются каждая по 2 раза
    prepareCards() {
        let id = 1;
        return [...config.cards, ...config.cards]
            //перемешиваем карточки в массивах
            .sort(() => Math.random() - 0.5)
            // перезадаем id, чтобы не было дублирования одного id у двух одинаковых карточек
            .map(item => ({...item, id: id++}));
    };

    // создаем функцию для принятия карточки, на которую нажали
    choiceCardHandler(item){
        console.log(item.name);
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
                                //добавляем для передачи в дочерний компонент метода
                                <Card item={item} key={item.id} onChoice={this.choiceCardHandler}/>
                                //верстка переносится в компонент Card
                                // <div className="card" key={item.id}>
                                //     <img src={'/images/' + item.image} alt={item.name}/>
                                // </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
