export default class GraphEdge {
  constructor(start, end, weight = 0) {
    this.startVertex = start;
    this.endVertex = end;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    let tempVertex = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tempVertex;
    return this;
  }

  toString() {
    return this.getKey();
  }
}
