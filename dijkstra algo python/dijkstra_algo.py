from priority_queue import priorityDictionary

with open('input.txt') as f:
    N = int(f.readline().split()[0])
    adjacency_list = dict(((i, []) for i in range(N)))
    for line in f:
        edge = [int(x) for x in line.split()]
        adjacency_list[edge[0]].append([edge[1], edge[2]])
        
# n1, n2 - start and end nodes of the path
def Dijkstra(adjacency_list, n1, n2):
  is_visited = [False] * N
  parents = [-1] * N
  # float('inf') - infinite value, initial value of marks
  marks = [float('inf')] * N
  queue = priorityDictionary()

  current = n1
  marks[current] = 0
  # add start node into the queue
  queue[current] = marks[current]
  
  # notes isn't deleted from the queue
  # (stupid implementation of the priority queue)
  # infinite value means that a node "isn't in the queue"
  while(queue[queue.smallest()] != float('inf')):
    current = queue.smallest()
    current_mark = queue[current]

    for adjacent_node in adjacency_list[current]:
      node = adjacent_node[0]
      edge_weight = adjacent_node[1]
      if not is_visited[node]:
        new_mark = current_mark + edge_weight
        if marks[node] > new_mark:
          marks[node] = new_mark
          parents[node] = current
          queue[node] = new_mark

    is_visited[current] = True;
    queue[current] = float('inf')

  # print optimal path (n1, n2)
  print "Path lenght is " + str(marks[n2])
  path = []
  current = n2
  path.append(current)
  while (current != n1):
    current = parents[current]
    path.append(current)
  path.reverse()
  print path

Dijkstra(adjacency_list, 0,  4)