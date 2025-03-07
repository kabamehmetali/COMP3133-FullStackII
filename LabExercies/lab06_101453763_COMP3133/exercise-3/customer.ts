class Customer {
    private firstName: string;
    private lastName: string;
    public constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }

}

let customer = new Customer("Mehmet Ali", "KABA");
customer.greeter();

