print("숫자의 최대값을 입력하세요")
min=1
max=int(input())
cnt=1
while True:
    guess= (min + max) //2
    print(f"당신이 생각한 숫자는 {guess} 입니까?")
    answer = input()
    if answer == "맞음":
        print(f"{cnt}번 만에 맞췄다")
        break
    elif answer == "큼":
        min = guess + 1
        cnt +=1
    elif answer == "작음":
        max = guess -1
        cnt+=1
    