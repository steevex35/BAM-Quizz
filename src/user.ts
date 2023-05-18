import { ObjQuestion } from "question";


export class User{
  prenom:string;
  nom:string;
  sex:string;
  entreprise:string;
  email:string;
  reglement:boolean;
  newsletter:boolean=false;
  question1?:ObjQuestion;
  question_awnser1?;
  question2?:ObjQuestion;
  question_awnser2?;
  question3?:ObjQuestion;
  question_awnser3?;
  question4?:ObjQuestion;
  question_awnser4?;
  max?=0;
  lng?;
  response:number;
}


