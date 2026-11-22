import Card from '../components/ui/Card.jsx';
import FormField from '../components/ui/FormField.jsx';

export default function LoginPage() {
  // TODO(logic): controlled fields, dispatch the login thunk, show the server message on 401,
  // after success navigate(location.state?.from ?? '/patients').
  return (
    <div className="narrow">
      <Card title="Log in">
        <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
          <FormField label="Email">{(p) => <input {...p} type="email" name="email" autoComplete="email" />}</FormField>
          <FormField label="Password">{(p) => <input {...p} type="password" name="password" autoComplete="current-password" />}</FormField>
          <div className="form__actions">
            <button type="submit" className="btn">Log in</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
