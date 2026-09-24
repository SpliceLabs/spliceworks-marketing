function App() {
  const [screen, setScreen] = React.useState(localStorage.getItem('sw-kit-screen') || 'home');
  const go = s => { setScreen(s); localStorage.setItem('sw-kit-screen', s); window.scrollTo(0, 0); };
  return <>
    <Nav screen={screen} go={go} />
    {screen === 'home' && <><Hero go={go} /><ArticleGrid go={go} /></>}
    {screen === 'article' && <Article go={go} />}
    {screen === 'subscribe' && <Subscribe />}
    <Footer />
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);