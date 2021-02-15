import LinkedList from '../linked-list/LinkedList';

export default class GraphVertex {
  constructor(value) {
    if (value === undefined) {
      throw Error;
    }

    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  getKey() {
    return this.value;
  }

  addEdge(edge) {
    this.edges.append(edge);
    return this;
  }

  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: (edge) => {
        // console.log('edge', edge);
        return edge === requiredEdge;
      },
    });

    return !!edgeNode;
  }

  deleteEdge(deletedEdge) {
    this.edges.delete(deletedEdge);
  }

  deleteAllEdges() {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));
  }

  getNeighbors() {
    const allEdges = this.getEdges();

    return allEdges.map((edge) =>
      edge.startVertex === this ? edge.endVertex : edge.startVertex
    );
  }

  hasNeighbor(vertex) {
    const allNeighboxVertices = this.getNeighbors();

    return allNeighboxVertices.indexOf(vertex) > -1;
  }

  findEdge(vertex) {
    const allEdges = this.getEdges();
    const requiredEdge = allEdges.find(
      (edge) => edge.startVertex === vertex || edge.endVertex === vertex
    );
    return requiredEdge ? requiredEdge : null;
  }

  getDegree() {
    return this.edges.toArray().length;
  }

  getEdges() {
    return this.edges.toArray().map((node) => node.value);
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
