import { Component, useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';


//class Slider extends Component {

//    constructor(props) {
//        super(props);
//        this.state = {
//            autoplay: false,
//            slide: 0
//        }
//    }

//    componentDidMount() {
//        document.title = `Slide: ${this.state.slide}`;
//    }

//    componentDidUpdate() {
//        document.title = `Slide: ${this.state.slide}`;
//    }

//    changeSlide = (i) => {
//        this.setState(({ slide }) => ({
//            slide: slide + i
//        }))
//    }

//    toggleAutoplay = () => {
//        this.setState(({ autoplay }) => ({
//            autoplay: !autoplay
//        }))
//    }

//    render() {
//        return (
//            <Container>
//                <div className="slider w-50 m-auto">
//                    <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                    <div className="text-center mt-5">Active slide {this.state.slide} <br /> {this.state.autoplay ? 'auto' : null}</div>
//                    <div className="buttons mt-3">
//                        <button
//                            className="btn btn-primary me-2"
//                            onClick={() => this.changeSlide(-1)}>-1</button>
//                        <button
//                            className="btn btn-primary me-2"
//                            onClick={() => this.changeSlide(1)}>+1</button>
//                        <button
//                            className="btn btn-primary me-2"
//                            onClick={this.toggleAutoplay}>toggle autoplay</button>
//                    </div>
//                </div>
//            </Container>
//        )
//    }
//}

const calcValue = () => {
    console.log('ramdom');

    return Math.random() * (50 - 1) + 1;
}


const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
    //const [state, setState] = useState({ slide: 0, autoplay: false });

    //function changeSlide(i) {
    //    setState(state => ({ ...state, slide: state.slide + 1 }));
    //}

    //function toggleAutoplay() {
    //    setState(state => ({ ...state, autoplay: !state.autoplay }));
    //}

    const getSomeImages = useCallback(() => {//функция имитирует запрос на сервер 
        console.log('fetching')
        return [
            "https://bipbap.ru/wp-content/uploads/2017/04/priroda_kartinki_foto_03.jpg",
            "https://image.freepik.com/free-photo/wide-angle-shot-of-a-single-tree-growing-under-a-clouded-sky-during-a-sunset-surrounded-by-grass_181624-22807.jpg"
        ]
    }, [slide]);


    function logging() {
        console.log('log!')
    }

    useEffect(() => {
        console.log('effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }

    }, [slide]);

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    const total = useMemo(() => {
        return countTotal(slide);//считает кол-во слайдов
    }, [slide])

    const style = useMemo(() => ({
        color: slide > 4 ? 'green' : 'black'
    }), [slide]);

    useEffect(() => {
        console.log('styles')
    }, [style]);

    return (
        <Container>
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages} />

                <div className="text-center mt-5">Active slide {slide} <br /> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({ getSomeImages }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);

    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider /> : null}
        </>
    );
}

export default App;


//Currency Converter

//const App = (props) => {

//    const [data, setData] = useState();
//    const [results, setResults] = useState(props.startMoney)

//    useEffect(() => {
//        const fetchData = async () => {
//            const response = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json`);
//            const data = await response.json();
//            setData(data);
//        };

//        fetchData();
//    }, [])

//    const convertToUAN = (currency) => {
//        const rate = data.filter(item => item.cc === currency);
//        console.log(rate)
//        const res = (props.startMoney / rate[0].rate).toFixed(1);
//        setResults(res);
//    }



//    return (
//        <div className="app">
//            <div >Start money:{props.startMoney}</div>
//            <div className="counter">{results}</div>
//            <div className="controls">
//                <button onClick={() => convertToUAN('EUR')}>INC</button>
//                <button onClick={() => convertToUAN('RUB')}>DEC</button>
//                <button onClick={() => convertToUAN('USD')}>RND</button>
//                <button onClick={() => convertToUAN('PLN')}>RESET</button>
//            </div>
//        </div>
//    )
//}

