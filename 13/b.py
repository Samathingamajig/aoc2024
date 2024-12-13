import z3
import re
import dataclasses

# A = z3.Int('A')
# B = z3.Int('B')

# s = z3.Solver()

# s.add(94 * A + 22 * B == 8400)
# s.add(34 * A + 67 * B == 5400)

# s.check()

# print(s.model())

with open("input.txt", "r") as f:
    text = f.read()

# with open("example.input.txt", "r") as f:
#     text = f.read()

sections = text.split("\n\n")

@dataclasses.dataclass
class Machine:
    ax: int
    ay: int
    bx: int
    by: int
    px: int
    py: int
    
machines = []

for section in sections:
    temp = section.split("\n")

    ax, ay = map(int, re.findall(r"\d+", temp[0]))
    bx, by = map(int, re.findall(r"\d+", temp[1]))
    px, py = map(int, re.findall(r"\d+", temp[2]))

    machines.append(Machine(ax, ay, bx, by, px + 10000000000000, py + 10000000000000))
    # machines.append(Machine(ax, ay, bx, by, px, py ))

# print(machines)

my_sum = 0

for machine in machines:
    A = z3.Int('A')
    B = z3.Int('B')

    opt = z3.Optimize()
    
    opt.add(machine.ax * A + machine.bx * B == machine.px)
    opt.add(machine.ay * A + machine.by * B == machine.py)
    opt.minimize(A)

    # s = z3.Solver()

    # s.add(machine.ax * A + machine.ay * B == machine.px)
    # s.add(machine.bx * A + machine.by * B == machine.py)

    # if multiple solutions, we need to minimize the sum of A and B
    
    

    if opt.check() == z3.sat:
        print(opt.model())

        my_sum += opt.model()[A].as_long() * 3 + opt.model()[B].as_long()
    
print(my_sum)
