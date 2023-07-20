import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css"
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";
import PostContainer from "./components/PostContainer";
// import PostContainer2 from "./components/PostContainer2";
import { fetchUsers } from "./store/reducers/ActionCreators";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { CDBAnimation } from 'cdbreact';



function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { count } = useAppSelector((state) => state.userReduser);
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReduser
  );
  const { increment } = userSlice.actions;
  const { decrement } = userSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className='pb-3 bg-secondary bg-gradient text-white'>

          <h1 className='text-center px-3 py-2 fw-bold fs-2'>React Redux<br />React-Redux<br />Redux Toolkit RTK Query<br /> React Bootstrap<br />TypeScript JSX HTML CSS</h1>

          {/* <CDBAnimation duration="5s" type="pulse"> */}
          <Button variant="outline-light" className='d-block mx-auto' onClick={handleShow}>
            О приложении
          </Button>
          {/* </CDBAnimation> */}

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton className='bg-secondary bg-gradient text-white'>
              <Offcanvas.Title>О приложении</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <b>#</b> Данное приложение реализовано на языке <b>Type Script</b> с
              помощью <b>JavaScript</b>-библиотеки – <b>React</b>, с использованием
              стейт менеджера <b>Redux</b>, <b>Redux Toolkit</b> и <b>RTK Query</b>.
              <br />
              <br />
              <b>#</b> В ходе работы создан стор&#40;<b>store</b>&#41; с помощью
              импортированной функции <b>configureStore</b> из <b>ReduxToolkit</b>.
              Создан корневой редьюсер&#40;rootReducer&#41;, а также типы для
              взаимодействия с хранилищем: тип состояния&#40;RootState&#41;, тип
              стора&#40;AppStore&#41; и тип диспатча&#40;AppDispatch&#41;. Для
              работы с <b>Redux</b> создано два кастомных хука: useAppDispatch и
              useAppSelector. Для создания редьюсера типизировали состояние
              UserState, определили какие поля и какого типа будут храниться в
              состоянии. Создали слайс userSlice с помощью функции{" "}
              <b>createSlice</b> с опциями. В опции <b>reducers</b> создали две
              функции для изменения состояния счетчика.
              <br />
              <br />
              <b>#</b> Получения списка пользователей с сервера является асинхронным
              процессом. <b>ReduxToolkit</b> включает в себя работу с{" "}
              <b>middleware</b> библиотекой <b>ReduxThunk</b>. Данные получаем от
              сервиса <b>JsonPlaceholder</b>. Импортировали функцию{" "}
              <b>createAsyncThunk</b> для создания асинхронного экшен
              генератора&#40;<b>action creator</b>&#41;, в котором с помощью
              библиотеки <b>axios</b> отправляем запрос по определенному <b>url</b>,
              в случае успешной загрузки возвращаем данные о пользователях в формате{" "}
              <b>json</b>, в случае ошибки возвращаем ошибку. В опции{" "}
              <b>extraReducers</b> функции <b>createSlice</b> описаны три сценария
              для изменения данных: <b>fulfilled</b> – успешная загрузка,{" "}
              <b>pending</b> – ожидание, <b>rejected</b> – ошибка. Список пользователей 
              отрисовывается в зависимости от значения
              полей&#40;isLoading, error&#41; в состоянии UserState.
              <br />
              <br />
              <b>#</b> Для работы с <b>RTK Query</b> реализуем функционал для
              получения и изменения данных о постах с сервера. Для начала установили{" "}
              <b>json-server</b>, с помощью которого получаем <b>REST API</b> без
              предварительной настройки. Данные будут храниться в файле в формате{" "}
              <b>json</b>. Для описания сервиса, который отвечает за изменение и
              получения данных о постах создаем postAPI с помощью функции{" "}
              <b>createApi</b>. При вызове функции передали ряд опций: уникальный
              ключ, который будет определять текущий сервис&#40;<b>reducerPath</b>
              &#41;; опцию <b>baseQuery</b>, в которую передали функцию{" "}
              <b>fetchBaseQuery</b> с опцией базового <b>url</b>, на который этот
              сервис будет отправлять запросы; опцию <b>endpoints</b>, в которой
              создали стрелочную функцию, которая возвращает объект со всеми
              описанными эндпоинтами, на которые отправляются запросы. В
              объекте, как ключ указали название метода, а в значение передаем
              результат вывода <b>query</b> или <b>mutation</b>. В объекте описано
              четыре метода: получение всех постов&#40;fetchAllPosts&#41;,
              добавление поста&#40;createPost&#41;, изменение
              поста&#40;updatePost&#41; и удаление поста&#40;deletePost&#41;. В
              корневой редьюсер добавляем postAPI редьюсер, с помощью уникального
              ключа <b>reducerPath</b>. В конфигурацию стора в поле{" "}
              <b>middleware</b> добавляем middleware postAPI, с помощью стрелочной
              функции, которая принимает функцию <b>getDefaultMiddleware</b>.
              Благодаря функции <b>getDefaultMiddleware</b> получаем дефолтный
              middleware, который уже подключён к ReduxTollkit и с помощью функции
              concat добавляем middleware, который получаем из postAPI. При
              отрисовке постов и функционала для них в компоненте пользуемся авто
              сгенерированными хуками из postAPI&#40;useFetchAllPostsQuery – для
              получения данных о постах, индикатора загрузки, индикатора ошибки и
              функции <b>refetch</b>, для обновления всех постов,
              useCreatePostMutation – для получения функции создания постов,
              useDeletePostMutation – для получения функции удаления постов,
              useUpdatePostMutation – для получения функции изменения поста&#41;.
              <br />
              <br />
              <b>Вывод</b>: Использование библиотеки <b>Redux Toolkit</b> помогает
              быстро начать использовать <b>Redux</b>, упрощает работу с типичными
              задачами и кодом <b>Redux</b>. Данные средства позволяют не только
              сделать процесс разработки более удобным, понятным и быстрым, но и
              более эффективным, за счет наличия в библиотеке ряда хорошо
              зарекомендовавших себя ранее инструментов. Использование{" "}
              <b>RTK Query</b> упрощает распространенные случаи загрузки данных в
              веб-приложении, избавляя от необходимости вручную писать логику
              загрузки и кэширования данных. Позволяет решить проблему дедубликации
              запросов, поддерживает кэширование при установке с настройками по
              умолчанию, автоматически создает хуки, исходя из заданных эндпоинтов –
              содержит полезные утилиты, позволяющие упростить написание кода.
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={8}>

          <h2 className='text-center text-dark mt-5'>Counter</h2>
          <h2 className='text-center text-dark'>{count}</h2>
          <div className="d-flex justify-content-center">
            <Button className='mx-3' variant="secondary" onClick={() => dispatch(increment(1))}>Incremnt</Button>
            <Button className='mx-3' variant="secondary" onClick={() => dispatch(decrement(1))}>Decremnt</Button>
          </div>

          <h2 className='text-center text-dark mt-5'>Users</h2>
          {isLoading ? (
            <Spinner className="d-block mx-auto" animation="border" variant="secondary" />
          ) : (
            <Fragment>
              {error ? (
                <div className='d-block mx-auto'>{error}</div>
              ) : (
                <Carousel>
                  {users.map((user: any) => (
                    <Carousel.Item key={user.id}>
                      <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                        alt="Second slide"
                      />
                      <Carousel.Caption>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Fragment>
          )}

          <h2 className='text-center text-dark mt-5'>Posts</h2>
          <PostContainer />
          {/* <PostContainer2 /> */}

        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
