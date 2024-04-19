export const TablesName = {
  QUESTIONS: 'QUESTIONS',
  ANSWERS: 'ANSWERS',
  ANSWER: 'ANSWER',
  IMPACT: 'IMPACT',
  QUESTION: 'QUESTION',
  QUESTIONSOURCE: 'QUESTIONSOURCE',
  TOPIC: 'TOPIC',
  TIMESTAMP: 'TIMESTAMP',
};

export const QuestionsSchema = {
  name: TablesName.QUESTIONS,
  properties: {
    id: 'int',
    answers: {
      type: 'list',
      objectType: TablesName.ANSWERS,
    },
    categories: 'string[]',
    impactOnSafety: TablesName.IMPACT,
    isActive: 'bool',
    latestUpdateDate: TablesName.TIMESTAMP,
    media: 'string?',
    points: 'int',
    question: TablesName.QUESTION,
    questionSource: TablesName.QUESTIONSOURCE,
    questionType: 'int',
    theme: 'string[]',
    topic: TablesName.TOPIC,
  },
};

export const AnswersSchema = {
  name: TablesName.ANSWERS,
  properties: {
    answer: TablesName.ANSWER,
    isCorrect: 'bool',
    id: 'string',
  },
};

export const AnswerSchema = {
  name: TablesName.ANSWER,
  properties: {
    de: 'string',
    pl: 'string',
    en: 'string',
  },
};

export const ImpactSchema = {
  name: TablesName.IMPACT,
  properties: {
    de: 'string',
    pl: 'string',
    en: 'string',
  },
};

export const QuestionSchema = {
  name: TablesName.QUESTION,
  properties: {
    de: 'string',
    pl: 'string',
    en: 'string',
  },
};

export const QuestionSourceSchema = {
  name: TablesName.QUESTIONSOURCE,
  properties: {
    de: 'string',
    pl: 'string',
    en: 'string',
  },
};

export const TopicSchema = {
  name: TablesName.TOPIC,
  properties: {
    de: 'string',
    pl: 'string',
    en: 'string',
  },
};

export const TimestampShema = {
  name: TablesName.TIMESTAMP,
  properties: {
    nanoseconds: 'int',
    seconds: 'int',
  },
};
