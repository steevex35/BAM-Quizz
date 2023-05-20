import { ObjQuestion } from "question";


export class User{
  prenom:string;
  nom:string;
  sex:string;
  entreprise:string;
  email:string;
  reglement:boolean;
  newsletter:boolean=false;
  question1Obj?:ObjQuestion;
  question1?:string;
  question_answer1?;
  question2Obj?:ObjQuestion;
  question2?:string;
  question_answer2?;
  question3Obj?:ObjQuestion;
  question3?:string;
  question_answer3?;
  question4Obj?:ObjQuestion;
  question4?:string;
  question_answer4?;
  lng?;
  response:number;
}


