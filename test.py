# you can use print for debugging purposes, e.g.
# print "this is a debug message"

# len(A) = N
# int Y is between min and max
# 
#
#
#

# gap_size = min([abs(A[0-(N-1)] - Y])

def gapSize(A, Y):
  return min(map(lambda x: abs(x-Y), A))

def yRange(A):
  return (A.index(min(A))+1,A.index(max(A))+1)

def solution(A):
    (x,y) = yRange(A)
    output = 0
    while y != x-1:
      gap_size = gapSize(A, y)
      if gap_size > output:
        output = gap_size
      y-=1
    return output

test = []
for i in range(2,100000):
  test.append(i)
print yRange(test)
print test
