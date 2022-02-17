import json

with open("words.json", "r") as file:
	wordJSON = file.read()
wordList = json.loads(wordJSON)

alpha = "abcdefghijklmnopqrstuvwxyz"

def mostWords():
	possibleSequences = []

	for letter1 in alpha:
		for letter2 in alpha:
			for letter3 in alpha:
				correlatedWords = 0

				for word in wordList:
					cond1 = word[0] == letter1
					cond2 = letter2 in word[1:-1]
					cond3 = word[-1] == letter3
					if cond1 and cond2 and cond3: correlatedWords += 1

				thisSequence = {
					"sequence": letter1 + letter2 + letter3,
					"numWords": correlatedWords
				}
				possibleSequences.append(thisSequence);

	sortedSequences = sorted(possibleSequences, key = lambda i: i["numWords"], reverse = True)
	
	with open("sorted-sequences.txt", "w") as file:
		for sequence in sortedSequences:
			file.write("%s\n" % sequence)



if __name__ == "__main__":
    mostWords()