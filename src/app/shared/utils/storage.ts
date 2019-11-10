/** Storage  */
export class Storage {

    static pid: string = 'DBG';
    static setLocalItem(key:string, val: any){
        key = this.pid+'-'+key;
        if(val) {
            if(typeof val === 'object'){
                val = JSON.stringify(val);
            }
            localStorage.setItem(key, val);
        }

    }
    static getLocalItem(key:string){
         key = this.pid+'-'+key;
        let val:string = localStorage.getItem(key);
        if(val) {
            if(val.indexOf("{") > -1) {
                val = JSON.parse(val);
            } else if(val.indexOf("[") > -1) {
                val = JSON.parse(val);
            }
            return val;
        } else {
            return null;
        }
    }
    static  removeLocalItem(key: string) {
         key = this.pid+'-'+key;
        localStorage.removeItem(key);
    }
    static setSessionItem(key:string, val: any){
         key = this.pid+'-'+key;

        if(val) {
            if(typeof val === 'object'){
                val = JSON.stringify(val);
            } else if(Array.isArray(val)){
                val = JSON.stringify(val);      
            }

            localStorage.setItem(key, val);
        }

    }

    static getSessionItem(key:string): any {
         key = this.pid+'-'+key;
        let val:string = window.localStorage.getItem(key);
        if(val) {
            if(val.indexOf("{") > -1) {
                val = JSON.parse(val);
            } else if(val.indexOf("[") > -1) {
                val = JSON.parse(val);
            }
            return val;
        } else {
            return null;
        }
    }
    static  removeSessionItem(key: string) {
        key = this.pid+'-'+key;
        localStorage.removeItem(key);
    }
    static sessionClear(){
        localStorage.clear();
    }


    static setJWT(val : string){
        if(val){
           sessionStorage.setItem(this.pid+'-jwt', val);
        }
    }
    static getJWT(){
        return sessionStorage.getItem(this.pid+'-jwt');
    }
    static setSessionUser(val : string){
        if(val){
           this.setSessionItem('user', val);
        }
    }

    static getSessionUser(): any {
        return this.getSessionItem('user');
    }
    static setMenuList(val : string){
        if(val){
           this.setSessionItem('menu', val);
        }
    }
    static getMenuList(): any {
        return this.getSessionItem('menu');
    }

    static getBranch(): string{
        return this.getSessionItem('branch');
    }

    static setBranch(val : string){
        if(val){
           this.setSessionItem('branch', val);
        }
    }

    static clearSession(): void {
        this.sessionClear();
        this.removeSessionItem('jwt');
        this.removeSessionItem('user');
        this.removeSessionItem('menu');
        this.removeSessionItem('branch');
    }
}