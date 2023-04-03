export default function Postdetail({params}: {params: {postid: string}}) {
    return(
        <div>Post {params.postid[0]}</div>
    )
}