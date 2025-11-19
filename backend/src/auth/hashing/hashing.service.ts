export abstract class HashingService{
  abstract hash(password:string) : Promise<string>
  abstract compare(passwordHash:string, password:string) : Promise<Boolean>
}