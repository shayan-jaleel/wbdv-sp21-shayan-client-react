import React from 'react'
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../../reducers/module-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import topicReducer from "../../reducers/topic-reducer";
import widgetReducer from "../../reducers/widget-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills"
import WidgetList from "../widgets/widget-list";

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer: widgetReducer
})

// const store = createStore(moduleReducer)
// const store = createStore(lessonReducer)
const store = createStore(reducer)

const CourseEditor = ({history}) => {
    const {courseId, moduleId, layout} = useParams();
    return (
        <Provider store={store}>
            <div className="container-fluid mt-3">
                <Link to={`/courses/${layout}`}>
                    {/*<i className="fas fa-arrow-left"/>*/}
                    <i className="fas fa-times float-right btn btn-danger fa-2x"/>
                </Link>
                <h3 className="font-weight-bold">
                    Course Editor
                    {/*<i onClick={() => props.history.goBack()}*/}
                    {/*   className="fas fa-times float-right"></i>*/}
                </h3>
                <div className="row mt-3">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                        <br/>
                        <TopicPills/>
                        <br/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        </Provider>)}

export default CourseEditor