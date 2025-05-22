export default ({ response }: { response: string }) => {
  console.log(response);

  return (
    <div>
      <video key={response} controls width={600} src={response}>AAAAAAA</video>
    </div>
  );
};
