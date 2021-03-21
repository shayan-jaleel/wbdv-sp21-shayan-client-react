import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import widgetService from "../../services/widget-service"

const WidgetList = () => {
    const {topicId} = useParams()
    // TODO: move all state handling to widgets-reducer.js
    const [widgets, setWidgets] = useState([])
    const [widget, setWidget] = useState({})
    useEffect(() => {
        widgetService.findWidgetsForTopic(topicId)
        // fetch(`http://localhost:8080/api/topics/${topicId}/widgets`)
        //     .then(response => response.json())
            .then(widgets => setWidgets(widgets))
    }, [topicId])

    const createWidget = () => {
        const newWidget = {type: "HEADING", size: 2, text: "New Widget"}
        widgetService.createWidgetForTopic(topicId, newWidget)
        // fetch(`http://localhost:8080/api/topics/${topicId}/widgets`, {
        //     method: 'POST',
        //     body: JSON.stringify({type: "HEADING", size: 2, text: "New Widget"}),
        //     headers: {
        //         "content-type": 'application/json'
        //     }
        // })
        //     .then(response => response.json())
            .then(widget => setWidgets((widgets) => [...widgets, widget]))
    }

    const deleteWidget = (id) =>
        widgetService.deleteWidget(id)
        // fetch(`http://localhost:8080/api/widgets/${id}`, {
        //     method: "DELETE" })
        .then((status) => {
            setWidgets((widgets) => widgets.filter(w => w.id !== id))
        })

    const updateWidget = (id, widget) =>
        // fetch(`http://localhost:8080/api/widgets/${id}`, {
        //     method: "PUT",
        //     body: JSON.stringify(widget),
        //     headers: {
        //         "content-type": 'application/json'
        //     }
        // }).
        widgetService.updateWidget(id, widget).
        then((status) => {
            setWidget({})
            setWidgets((widgets) => widgets.map(w => w.id === id ? widget : w))
        })

    return(
        <div>
            <i onClick={createWidget} className="fas fa-plus float-right fa-2x"/>
            <h1>Widget List {widget.id}</h1>
            <ul className="list-group">
                {
                    widgets.map(_widget =>
                        <li key={_widget.id} className="list-group-item">
                            {
                                _widget.id === widget.id &&
                                <>
                                    <i onClick={() => deleteWidget(_widget.id)} className="fas fa-trash float-right"/>
                                    <i onClick={() => {
                                        updateWidget(_widget.id, widget)
                                    }} className="fas fa-check float-right"/>

                                    {
                                        widget.type === "HEADING" &&
                                        <HeadingWidget
                                            setWidget={setWidget}
                                            editing={_widget.id === widget.id}
                                            widgetActive={widget}
                                            widgetListItem={_widget}/>
                                    }
                                    {
                                        widget.type === "PARAGRAPH" &&
                                        <ParagraphWidget
                                            setWidget={setWidget}
                                            editing={_widget.id === widget.id}
                                            widgetActive={widget}
                                            widgetListItem={_widget}/>
                                    }
                                </>
                            }
                            {
                                _widget.id !== widget.id &&
                                <div>
                                    <i onClick={() => setWidget(_widget)} className="fas fa-cog float-right"/>
                                    {
                                        _widget.type === "HEADING" &&
                                        <HeadingWidget
                                            setWidget={setWidget}
                                            editing={_widget.id === widget.id}
                                            widgetActive={widget}
                                            widgetListItem={_widget}/>
                                    }
                                    {
                                        _widget.type === "PARAGRAPH" &&
                                        <ParagraphWidget
                                            setWidget={setWidget}
                                            editing={_widget.id === widget.id}
                                            widgetActive={widget}
                                            widgetListItem={_widget}/>
                                    }
                                </div>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default WidgetList