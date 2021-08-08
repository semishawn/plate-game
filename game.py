import random
import string

# List of English words to check
wordList = open("words.txt").read().splitlines()

def play():
	# Choose a random word from word list
	randomWord = random.choice(wordList)

	# Randomly generated letters
	letter1 = randomWord[0]
	letter2 = random.choice(randomWord[0 : -1])
	letter3 = randomWord[-1]
	letString = (letter1 + letter2 + letter3).upper()

	# Randomly generated numbers
	numList = random.sample(string.digits, 4)
	numString = "".join(numList)

	# Display license plate and prompt
	print(letString + "-" + numString)
	wordInput = input("Type word: ")

	# Check if word entered exists in English
	if wordInput in wordList:
		firstCheck = wordInput[0] == letter1
		middleCheck = letter2 in wordInput[0 : -1]
		lastCheck = wordInput[-1] == letter3
		if firstCheck and middleCheck and lastCheck: print("+" + str(len(wordInput)) + " points!")

	else: print("That's not a word!")



if __name__ == '__main__':
	play()