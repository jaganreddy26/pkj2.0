export class Validators {
    static TYPE_ALL: string = 'ALL';
    static TYPE_DATA: string = 'DATA';
    static TYPE_DECIMAL: string = 'DECIMAL';
    static TYPE_NUMBER: string = 'NUMBER';
    static TYPE_DATE: string = 'DATE';
    static TYPE_EMAIL: string = 'EMAIL';
    static TYPE_WEBSITE: string = 'WEBSITE';
    static TYPE_ALFA: string = 'CHAR';
    static TYPE_ALFA_DES: string = 'CHAR_DES';
    static TYPE_ALFA_NUM_DES_SPACE: string = 'TYPE_ALFA_NUM_DES_SPACE';
    static TYPE_ALFA_NUM_DES_SPACE_HIFEN: string = 'ALFA_NUM_DES_SPACE_HIFEN';
    static TYPE_ALFA_NUM: string = 'ALFA_NUM';
    static TYPE_COMBI_NUM: string = 'COMBI_NUM';
    static TYPE_MOBILE_NO: string = 'MOBILE_NO';
    static TYPE_BUSI_NAME: string = 'BUSI_NAME';
    static TYPE_PHONE_NO: string = 'PHONE_NO';
    static ALPHABETICAL_PATTERN:string = '^[a-zA-Z]+$';
   
    static EMAIL_PATTERN: string = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
    static ALFA_PATTERN: string = '^[a-zA-Z\']+';
    static NAME :string = '^([A-Za-z0-9&.,-]+ )+[A-Za-z0-9&.,-]+$|^[A-Za-z0-9&.,-]+$';
  
    static NUMBER_PATTERN: string = '[0-9]*$';
    static DATE_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
  
    static ALFA_SPACE_PATTERN: string = '[a-zA-Z0-9_ ]*$';
    static IP_ADDRESS: string = '^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$'
    static DESCRIPTION :string = '^([A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+ )+[A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+$|^[A-Za-z0-9!@#$%^&*()_+=`~\\][{}|\'\"-;:/.,?><]+$';
    static ALFA_DES_PATTERN: string = '^([A-Za-z0-9&.-]+ )+[A-Za-z0-9&.-]+$|^[A-Za-z0-9&.-]+$';
    static ALL_PATTERN: string = '(.*?)';
    static DATA_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static DECIMAL_PATTERN: string = '(\\d+(\\.\\d{1,2})?)';
    static ALFA_NUM_DES_SPACE_PATTERN: string = '^[0-9a-zA-Z/ -]+$';
    static ALFA_NUM_DES_SPACE_HIFEN_PATTERN: string = '^[A-Za-z0-9? ,_-]+$';
    static ALFA_NUM_PATTERN: string = '^[a-zA-Z0-9]+';
    static IFSC_CODE_PATTERN: string = '^[A-Z|a-z]{4}[0][0-9]{6}$';
    static ZIP_CODE_PATTERN: string = '([1-9])([0-9]){5}$';
    static GST_CODE_PATTERN: string = '[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$';
    static PAN_NO_PATTERN: string = '[A-Z|a-z]{3}(p|P|c|C|h|H|f|F|a|A|t|T|b|B|l|L|j|J|g|G)[A-Z|a-z][0-9]{4}[A-Z|a-z]$';
    static MOBILE_NO_PATTERN: string = '^[7-9][0-9]{9}$';
    static BUSI_NAME_PATTERN: string = '([A-Za-z])+( [A-Za-z]+)*$';
    static PHONE_NO_PATTERN: string = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}';
    static PIN_CODE_PATTERN: string = '^[1-9][0-9]{5}$';
}
export class account_validation_messages  {
 
    email: any=[
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ];
    password: any=[
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Enter a valid Password' }
      ]
}