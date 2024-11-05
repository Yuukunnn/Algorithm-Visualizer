import React, { Component } from "react";
import "./Pathfinding.css";
import Node from "./Node.js";
import Dijkstra from "./algorithms/Dijkstra.js";
import AStar from "./algorithms/astar.js";
import Instruct from "../Instructions/Instruct.js";
import instruct_gif from "../../assets/pathfinder.gif";
import { NavLink } from "react-router-dom";

class Pathfinding extends Component {
    constructor() {
        super();
        this.state = {
            method: "Algorithms",
            grid: [],
            mouseClicked: false,
            mainClicked: "",
            start_node: null,
            end_node: null,
            visited: 0,
            shortestPath: 0,
            number_of_nodes: 0,
            algo_info: {
                "Algorithms": {
            text: "",
            url: ""
        },
        "Dijkstra's Algorithm": {
            text: "Dijkstra's Algorithm is a popular algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It can handle graphs with non-negative weights and is often used in routing and as a subroutine in other graph algorithms.",
            url: "https://www.redblobgames.com/pathfinding/a-star/introduction.html"
        },
        "A* Search": {
            text: "A* Search Algorithm is widely used for pathfinding and graph traversal. It is an extension of Dijkstra's Algorithm with an additional heuristic that prioritizes paths that seem most likely to lead to the goal, making it more efficient in practice for many problems.",
            url: "https://www.redblobgames.com/pathfinding/a-star/introduction.html"
        },
        "Breadth First Search": {
            text: "Breadth First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or an arbitrary node of a graph) and explores the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
            url: "https://www.redblobgames.com/pathfinding/a-star/introduction.html"
        }
            },
            showModal: true
        };
        this.animating = false;
    }

    makeGrid = () => {
        if (this.animating) return;
        let row_size = Math.floor((window.innerHeight - 200) / 27);
        let col_size = Math.floor((window.innerWidth - 200) / 27);
        let arr = [];
        for (let i = 0; i < row_size; i++) {
            let row = [];
            for (let j = 0; j < col_size; j++) {
                row.push({
                    value: 1,
                    row: i,
                    col: j,
                    isVisited: false,
                    isShortestPath: false,
                    isWall: false,
                    isShortestPath: false
                });
                try {
                    document.getElementById(`node-${i}-${j}`).className = "node_";
                } catch { }
            }
            arr.push(row);
        }
        let start_x = Math.floor(Math.random() * row_size);
        let start_y = Math.floor(Math.random() * col_size);
        let end_x = Math.floor(Math.random() * row_size);
        let end_y = Math.floor(Math.random() * col_size);
        arr[start_x][start_y].isStart = true;
        arr[end_x][end_y].isEnd = true;

        this.setState({
            grid: arr,
            start_node: [start_x, start_y],
            end_node: [end_x, end_y],
            number_of_nodes: arr.length * arr[0].length,
            visited: 0,
            shortestPath: 0
        })
    }

    componentDidMount() {
        this.makeGrid();
        window.addEventListener("resize", this.makeGrid);
    }

    handleMouseDown = (row, col) => {
        if (this.animating) return;
        let arr = this.state.grid;
        if (arr[row][col].isStart) {
            this.setState({ mainClicked: "start" })
        }
        else if (arr[row][col].isEnd) {
            this.setState({ mainClicked: "end" })
        }
        if (!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd)
            arr[row][col].isWall = true;
        else if (arr[row][col].isWall) {
            arr[row][col].isWall = false;
        }
        this.setState({ grid: arr, mouseClicked: true })
    }

    handleMouseEnter = (row, col) => {
        if (this.animating) return;
        if (this.state.mouseClicked) {
            let arr = this.state.grid;
            if (this.state.mainClicked == "start") {
                arr[row][col].isStart = true;
                this.setState({ start_node: [row, col] })
            }
            else if (this.state.mainClicked == "end") {
                arr[row][col].isEnd = true;
                this.setState({ end_node: [row, col] })
            }
            else if (!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd)
                arr[row][col].isWall = true;
            else if (arr[row][col].isWall) {
                arr[row][col].isWall = false;
            }
            this.setState({ grid: arr, mouseClicked: true })
        }
    }

    handleMouseLeave = (row, col) => {
        if (this.animating) return;
        let arr = this.state.grid;
        if (this.state.mainClicked != "") {
            arr[row][col].isStart = 0;
            arr[row][col].isEnd = 0;
            this.setState({ grid: arr })
        }
    }

    handleMouseUp = () => {
        if (this.animating) return;
        this.setState({ mouseClicked: false, mainClicked: "" })
    }

    dijkstra = (e) => {
        e.preventDefault();
        if (this.animating) return;
        let arr = this.state.grid;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (document.getElementById(`node-${i}-${j}`).className == "node_path")
                    document.getElementById(`node-${i}-${j}`).className = "node_";
                if (document.getElementById(`node-${i}-${j}`).className == "node_visited") {
                    document.getElementById(`node-${i}-${j}`).className = "node_";
                }
            }
        }

        let { visited_nodes, shortestPath } = Dijkstra(this.state.grid, this.state.start_node, this.state.end_node)

        const animate = async () => {
            let i = 0;
            let j = 0;
            this.animating = true;

            const animateVisited = () => {
                if (i == visited_nodes.length) {
                    requestAnimationFrame(animatePath);
                    return;
                }
                arr[visited_nodes[i].row][visited_nodes[i].col].isVisited = true;
                if (!arr[visited_nodes[i].row][visited_nodes[i].col].isStart && !arr[visited_nodes[i].row][visited_nodes[i].col].isEnd)
                    document.getElementById(`node-${visited_nodes[i].row}-${visited_nodes[i].col}`).className = "node_visited";
                ++i;
                requestAnimationFrame(animateVisited);
            }

            const animatePath = () => {
                if (j == shortestPath.length) {
                    this.setState({
                        grid: arr,
                        visited: visited_nodes.length,
                        shortestPath: shortestPath.length
                    })
                    this.animating = false;
                    return;
                }
                arr[shortestPath[j].row][shortestPath[j].col].isShortestPath = true;
                if (!arr[shortestPath[j].row][shortestPath[j].col].isStart && !arr[shortestPath[j].row][shortestPath[j].col].isEnd)
                    document.getElementById(`node-${shortestPath[j].row}-${shortestPath[j].col}`).className = "node_path";
                ++j;
                requestAnimationFrame(animatePath);
            }

            await requestAnimationFrame(animateVisited);
        }
        animate().then(() => { });
    }

    toggleChat = () => {
        var chatBody = document.getElementById("info-body");
        chatBody.style.display = chatBody.style.display === 'none' ? 'block' : 'none';
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    componentDidUpdate() {
        let method = this.state.method;
        if (method != "Algorithms") {
            document.getElementById("info-btn").style.display = "block";
        }
    }

    render() {
        return (
            <div>
                <Instruct show={this.state.showModal}>
                    <h3>How to use?</h3>
                    <img className="instruction-image" src={instruct_gif} alt="Instructions" />
                    <button className="btn-close" onClick={this.hideModal}>Close</button>
                </Instruct>
                <nav className="navbar">
                    <a className="navbar-brand">Pathfinding Visualizer</a>
                    <div className="navbar-content">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        <select
                            className="dropdown-select"
                            value={this.state.method}
                            onChange={(e) => this.setState({ method: e.target.value })}
                        >
                            <option value="Algorithms">Algorithms</option>
                            <option value="Dijkstra's Algorithm">Dijkstra's Algorithm</option>
                            <option value="A* Search">A* Search</option>
                        </select>
                        <a className="nav-link" onClick={this.makeGrid}>Clear</a>
                        <a className="nav-link" onClick={this.showModal}>Instructions</a>
                        <div className="progress-container">
                            <p className="progress-text">Visited Nodes: {this.state.visited}</p>
                            <div className="progress-bar" style={{ width: `${(this.state.visited / this.state.number_of_nodes) * 100}%` }}></div>
                        </div>
                        <div className="progress-container">
                            <p className="progress-text">Shortest Path: {this.state.shortestPath}</p>
                            <div className="progress-bar" style={{ width: `${(this.state.shortestPath / this.state.number_of_nodes) * 100}%` }}></div>
                        </div>
                        <div id="error" className="alert" role="alert">
                            Select an algorithm first!
                        </div>
                    </div>
                    <button className="btn-find-path" onClick={this.dijkstra}>Find Path</button>
                </nav>
                <div className="grid-container">
                    <table>
                        <tbody>
                            {
                                this.state.grid.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                row.map((element, i) => {
                                                    return (
                                                        <Node
                                                            value={element}
                                                            isWall={element.isWall}
                                                            isStart={element.isStart}
                                                            isEnd={element.isEnd}
                                                            isVisited={element.isVisited}
                                                            isShortestPath={element.isShortestPath}
                                                            key={i}
                                                            row={index}
                                                            col={i}
                                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                                            onMouseUp={() => this.handleMouseUp()}
                                                            onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}
                                                        />
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="chat-container">
                    <button id="info-btn" className="chat-btn" onClick={this.toggleChat}>ℹ</button>
                    <div id="info-body" className="chat-body" style={{ display: "none" }}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.method}</h5>
                                <p className="card-text">{this.state.algo_info[this.state.method].text}</p>
                                <a href={this.state.algo_info[this.state.method].url} target="_blank" className="card-link">More Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pathfinding;
