library('jsonlite')

args = commandArgs(trailingOnly=TRUE)

ranking <- c(5, 4, 3, 24, 5, 1, 222, 76)
top_ten <- ranking < 10

if (length(args) == 0) {
  cat(ranking[top_ten])
} else if (length(args) == 1 & args[1] == 'json' ) {
  cat(toJSON(ranking[top_ten]))
}
