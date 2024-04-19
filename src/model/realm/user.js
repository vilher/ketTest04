import {TablesName} from './question';

export const UserTable = {
  USER: 'USER',
  ANSWER: 'USERANSWER',
};

export const UserSchema = {
  name: UserTable.USER,
  properties: {
    id: 'int',
    category: 'string',
    language: 'string',
    appearance: 'string',
    likes: {
      type: 'list',
      objectType: TablesName.QUESTIONS,
    },
    answers: {
      type: 'list',
      objectType: UserTable.ANSWER,
    },
  },
};

export const UserAnswerSchema = {
  name: UserTable.ANSWER,
  properties: {
    question: TablesName.QUESTIONS,
    answers: 'bool[]',
  },
};
