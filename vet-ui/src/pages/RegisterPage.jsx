import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";

export default function RegisterPage(){
    return( 
        <div className="narrow">
            <Card title="Registration">
        <form className="form" onSubmit={(e)=>{e.preventDefault()}}>
          <FormField label="Name"/>
          <FormField label="Email" />
          <FormField label="Password" />
          <FormField label="Confirm Password"/>

        <div className="form__actions">
            <button type="submit" className="btn">Register</button>
            <p>Alredy have an account? <a href="/register">Login here</a></p>
          </div>
        </form>
    </Card>
        </div>
    );
}