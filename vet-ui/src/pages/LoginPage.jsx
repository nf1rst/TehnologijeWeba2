import Card from '../components/ui/Card.jsx';
import FormField from '../components/ui/FormField.jsx';

export default function LoginPage() {
  return (
    <div className="narrow">
      <Card title="Log in">
        <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
          <FormField label="Email" type="text" name="name"/>
          <FormField label="Password" type="password" name="password"/>
          <div className="form__actions">
            <button type="submit" className="btn">Log in</button>
            <p>Don't have an account? <a href="/register"> Register here</a></p>
          </div>
        </form>
      </Card>
    </div>
  );
}
