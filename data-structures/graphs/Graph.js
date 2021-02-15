export default class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;
    return this;
  }

  getVertexByKey(key) {
    return this.vertices[key];
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  addEdge(newEdge) {
    if (!this.getVertexByKey(newEdge.startVertex.getKey())) {
      this.addVertex(newEdge.startVertex);
    }

    if (!this.getVertexByKey(newEdge.endVertex.getKey())) {
      this.addVertex(newEdge.endVertex);
    }

    if (this.edges[newEdge.getKey()]) {
      throw new Error('edge already added');
    } else {
      this.edges[newEdge.getKey()] = newEdge;
    }

    if (this.isDirected) {
      newEdge.startVertex.addEdge(newEdge);
    } else {
      newEdge.startVertex.addEdge(newEdge);
      newEdge.endVertex.addEdge(newEdge);
    }
    return this;
  }

  findEdge(start, end) {
    const allEdges = Object.values(this.edges);

    let requiredEdge = null;

    if (!this.isDirected) {
      requiredEdge = allEdges.find(
        (edge) =>
          (edge.startVertex === start || edge.startVertex === end) &&
          (edge.endVertex === start || edge.endVertex === end)
      );
    } else {
      requiredEdge = allEdges.find(
        (edge) => edge.startVertex === start && edge.endVertex === end
      );
    }

    return requiredEdge ? requiredEdge : null;
  }

  deleteEdge(edge) {
    // if no such edge throw err;

    if (!this.findEdge(edge.startVertex, edge.endVertex)) {
      throw new Error('no such edge');
    }

    if (this.isDirected) {
      edge.startVertex.deleteEdge(edge);
    } else {
      edge.startVertex.deleteEdge(edge);
      edge.endVertex.deleteEdge(edge);
    }
    delete this.edges[edge.getKey()];
  }

  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  getWeight() {
    const allEdges = this.getAllEdges();

    return allEdges.reduce((acc, edge) => acc + edge.weight, 0);
  }

  reverse() {
    if (!this.isDirected) {
      return;
    }

    let allEdges = this.getAllEdges();

    allEdges.forEach((edge) => {
      edge.startVertex.deleteEdge(edge);
      edge.endVertex.addEdge(edge);

      let tempStart = edge.startVertex;
      edge.startVertex = edge.endVertex;
      edge.endVertex = tempStart;
    });
  }

  getVerticesIndices() {
    const allVerticeKeys = Object.keys(this.vertices);
    let verticesIndices = {};
    allVerticeKeys.map((key, index) => {
      verticesIndices[key] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix() {
    let allVertices = this.getAllVertices();
    let allVerticeIndexes = this.getVerticesIndices();

    let matrix = Array(allVertices.length)
      .fill(null)
      .map(() => {
        return Array(allVertices.length).fill(Infinity);
      });

    this.getAllVertices().map((vertex) => {
      let allEdges = vertex.getEdges();
      let currentVertexIndex = allVerticeIndexes[vertex.getKey()];

      allEdges.forEach((edge) => {
        let currentNeighbor =
          edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        let currentNeighborIndex = allVerticeIndexes[currentNeighbor.getKey()];
        matrix[currentVertexIndex][currentNeighborIndex] = edge.weight;
      });
    });

    return matrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}
