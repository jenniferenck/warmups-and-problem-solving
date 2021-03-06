function Graph() {
  this.adjacencyList = {};
}

Graph.prototype.breadthFirstSearch = function(start) {
  // Create an empty queue
  const queue = [start];
  const result = [];
  const visited = {};
  let currentVertex;

  // visit node
  visited[start] = true;

  // While there is still remaining vertices in queue
  while (queue.length) {
    currentVertex = queue.shift();
    result.push(currentVertex);

    // visit neighbors
    this.adjacencyList[currentVertex].forEach(neighbor => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    });
  }
  return result;
};

// previously-implemented functions

Graph.prototype.numEdges = function() {
  let total = 0;

  Object.values(this.adjacencyList).forEach(list => {
    total += list.length;
  });

  // note that we've double-counted up til now since we've looked at
  // the adjacencyList for every node.
  return total / 2;
};

Graph.prototype.addVertex = function(vertex) {
  this.adjacencyList[vertex] = [];
};

Graph.prototype.addEdge = function(vertex1, vertex2) {
  this.adjacencyList[vertex1].push(vertex2);
  this.adjacencyList[vertex2].push(vertex1);
};

Graph.prototype.removeVertex = function(vertex) {
  while (this.adjacencyList[vertex].length) {
    const adjacentVertex = this.adjacencyList[vertex].pop();
    this.removeEdge(adjacentVertex, vertex);
  }
  delete this.adjacencyList[vertex];
};

Graph.prototype.removeEdge = function(vertex1, vertex2) {
  this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
    v => v !== vertex2
  );
  this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
    v => v !== vertex1
  );
};
