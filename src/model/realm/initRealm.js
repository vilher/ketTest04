import Realm from 'realm';
import {
  QuestionSchema,
  AnswerSchema,
  AnswersSchema,
  ImpactSchema,
  QuestionSourceSchema,
  QuestionsSchema,
  TopicSchema,
  TimestampShema,
} from './question';
import {UserSchema, UserAnswerSchema} from './user';

export const realmDb = new Realm({
  schema: [
    QuestionSchema,
    AnswerSchema,
    AnswersSchema,
    ImpactSchema,
    QuestionSourceSchema,
    QuestionsSchema,
    TopicSchema,
    TimestampShema,
    UserSchema,
    UserAnswerSchema,
  ],
});
