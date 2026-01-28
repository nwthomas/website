import Link from "next/link";

const asciiArt = `
                                                   :"::""""" ",","","""""  """"                                                                              
                                                  I;,,:,,,,,,,":",,",:,,"," " " """,,,"""""""" " ,,"",",""" I?1_!,                                           
                                                  [-]?-??-?-_?-_--?----__-----?-_-?___-_~~~<~~<<<~<<><i<<><!}}/[?]]-~i,                                      
                                                  }?--]?-_--?-]-_-_?--_-_-??-?---__+__~__--____+__-___+__+_{{}[??]]]?-_?-                                    
                                                  [-??rcYYJJUYYYYYYYYYXXXYYYYYYUJJUUJJUJUUYXvxr|1}}{}}}+___)1???]]]---?--                                    
                                                  [?-?rvcz*B%%%%888&&&WWWWWWWWWWWWWW&W&&888%8#dpqqpqZCQ++__11?-?]]?]---??]                                   
                                                  ]---rnz888%88888&&&&&&WWWWWWWMWMMMMMMWMMMMM######*ohZ____){{?-??]?------                                   
                                                  [---rnc&8L ! !l" ;"I!  : ,  +~I>~++________----]fhM*0___?{}]-??]?--?--?+                                   
                                                  ]--_ruU&8+/","I<~l:"I<~I             ;+_+lIl!llll+W#Q___[1{?-?-?]-??-?--                                   
                                                  [?_]rnQ88~:  ,           ,"I;I             ii :!!+&hn___]{??-----------+                                   
                                                  [-?)xxQ88+"                                i l,,l0Wh}-_-]1[??-?-?------+                                   
                                                 ?]-?{ruO&&+"     l,   :    l                iii!!!MWh[-__]{?|-??-------_l                                   
                                                 [-?-)xnw&a~"                ""             t!>ii!!&Wh[__+[}?]-?----?-?--                                    
                                                 ]---)xu%&z+:     :,    "                   ;l!i!!i8Wk]___{{?-_---?-----_                                    
                                                 [?--{xu%8Xi "         :bu               ,  Ill!ii!8Mk?__-1{----?------__                                    
                                                 [?-?)xu%8Xi                                I!!!i!|8MU?-__1{?---?----?-__                                    
                                                 }-??1xv%8zi           ":                   ;!i!!!u8Wz?-_-{{|__?---?----_                                    
                                                 }]-?/xc%8z>,            :                 "-!l!iiv8Mz-_-_1{[-_----??---_                                    
                                                 [??]rxz%8c<+!Ill;II!]zt;                 " i!ii!!v&Mz-?-]{}-__-?--?----~                                    
                                                :[??[rxz%%cii><i!!i<iil>il>!l>li>Iil>>!i>>iiliIll!c&Wz_--}{--__---?---__>                                    
                                                ,?]]?rrvB8c><i!,+I<Il:">!!  >l  iI  iiI,!i! ii: !!v&kr+-_{{--__------?-->                                    
                                                :?]]]rrx%&888888&WMp(1{{111f];     " :!::;: ;:"  lO&q[---}{-]------?---_>                                    
                                                ,]?]]f)_+z*#M#####MMMMMMMWWMMWWWWWW&&&&&&&&&&&&&WM&Wq]-?-}}-]__--------_>                                    
                                                ,]]?]+;l!>iiii!iiii>})((||tbo****#############MMMMMoz[??-}}___----------i                                    
                                                :[][}]?[[}{[[]]?[]]]]]]-?--??-_::lllIIIIIIlllllllll!{}[-[{{_+__-?-----?_i                                    
                                                :[[][]}[[[]]]}[[]]]]]]--]]]?]?]][{}[{}}{]?][?]]????]?]??]1[__+--_-__---_                                     
                                                :}[[]][]][]?]]]???]]?]]???][??][][][]]]]]?]]----??---?-?]{]-___--?-----_                                     
                                                _[[][]?]]]]]]?]?]]]?]?]]???-?]]?][]?]]?]]]?]?-?-?--??-?-]{?x____--_-_--+                                     
                                                }[]]])]]??]]]]]][[][]]]]?]??]??]??]]?]??]-?]?]]-??---???]}?]_+-_-_----_+                                     
                                                [}[[YUr]cY?}{|1t)[][]]][]?|rjf(}}[[[]}[[[})xrffft)}[]-]?[{?_+___-_----_+                                     
                                                [][-][][[]]]][][]]]]]]?[[[[~|k&%BBBB@$$$$@8q&crnvXx[?[}]{}+__-__-_____+~                                     
                                                [[[[[]]][][[[[][]]][[]]}[][{}[[[}1}[})--!<})**%Bh%n[}[?}{}-__+__-----__<                                     
                                                [[[[[[[[[[][[[[[[[[[]]]]]?[]}}}}[]][[}[]?]+!!i!!I,!?[[]]1}1_+_____-___+:                                     
                                                ][}}[}}}[[}[[]]][[[[}[}[]]][[][[]]]]??]??]?[]]]{{1][}?]]}}{______--_-_+:                                     
                                                }1{}{}}}[[[[}][[[[[[}[}[][][]]][?]?[]]]][]?]][][}][??]]]{}_++__--?_-__zi                                     
                                                )trrxrjjjjjxjrjrjfr|1}{}}[[]}}[[[[][]]][]]]??]]]?]]]?--[{[__+_+-_-_-rXu;                                     
                                                   lcxnuuvuxxxnnnxxxxrnxxjrrxxfrrfjfff({{[[[][]]??]]]?][{-++_---_-jXXc},                                     
                                                   ,XJCCLQ00Q0000Q00QQYXXXccnrrxxrrxxrjrrjfjrrrrrrjfttt(1-+__+--j[f{x_l                                      
                                                   "nzYUCLJCLLLLLQQ00000OOOZZZZZOZmmZZO0UUYYYvrxnxjrrjrt([}_--x]n_n]/x?~                                     
                                                   "xvzzXYYYYUUUUJJJJCCLCLLQQ00O000OOOOOOOOOOOOZZOO000LCUv/__/LfU[rZf_+~                                     
                                                    rxuczzzXzzXYUUYYUUUJJJJJJJCCCCCCCCCCCCLLLLQQLZ#@&LJYzx|?-(__{qz_+~_+                                     
                                                  "i]n0b*8B@@Mpw0LJJYYYYYYYYYUUYUUUUUUUJJUUUUUJJJZao8UXcvr(?-|[CC]___+++n                                    
                                                :1{{]-~]{(/jnvzUCQOwba#W&%B@@*bpwmQJJUYYYYYYYYYYUQw0LXzvuf)]?zO)_-?][}1i"f1,                                 
                                                :1((||||///////t/|(([}))()trncUCCQOqbao#W%B@8*ahdLwQUXXvnt()Zf_]][}}}[[l  ;~/                                
                                                :1((||//////t//tftfttfjffffftftt/|(1)))1[|frvXJLO0pdbho##oqc-][[[[[]]]}"    !r                               
                    i--1 l                      :{))(/////t///t/ttttffffttfftf/fffffffffffjrrxXUUzr({[?_[]_]]]]]]]][}i        /)                             
                  "~00Zbz{nq/{[vv}n{r :         ,{{)((/fftfftfttffff/tfftttfttttt/ttftjjjjjxnwQqwcj|()1)1)}[??]}]][1"          )t                            
                "C|(({(wXvfuqCZ0mmmZdc/|wO(})Zlt1|1i+{(((jYJjjjufffftttttftff//tftftttffjjrcUhZpQn/()11{{{[???]]]]l             >|1!                         
              ,|[}}}1fqLYOwbqvrkO){rpU){/qQXJOmOZbLunXpr){fJ~j(xi?|((}||U/||xj///ttttfjjurYUJOOYxf|1{}}}}}]??]]{]"               I: ~/-"                     
            |)-[(xucUdw0UbpX1rQJf}vbqzpZkZXzOb({}JdvffXq0cqqqmLbmYxxqvn(tL<))[x_)]?]|xttUXUQ0b#r/|){}}}[[]???]1;                       l[(l                  
          i?tjLLJUYzwqXccZX|(xXwmmwpLJYbC)|xqOrxjpdqpmkq0uLbc//xpqrjxLmOZh0JUQdY{)(((X:::;_U/)?-?1{/[]]]???]?~                             !t                
        :XXzn{qd)1{}[[{(nhOZmqh0Cckq((tmZtxzmZOZkqwxnpd/t/JaxvpqdwmZpw|(|Op/))/w0tc00Lp;:zQCYm_|t/u;[|)(-!1+!I                                c+             
        iUYvXXQ0YYXXXccZ0)1}}}}}[[}{jLCwLLJkdC0zddxjtcqQCCq00OObrrrvqYrxt0w1/CZx1(|L0f,:tjjxqLf/|ZpqQOOmqvjjju;,,,ll                            :f"          
   ,        "" "",,>xrfLQUYXzccccuj|/|{{}{{}}{1(UYYXJhJJJYkZnvuwmrjYwZ0CObOXxxj){rQQ+,,rLC0dp0nuLpU//fpdfutfJL!::i><"                             !)         
  ;"                      "",,i))1XLJYYXzczcvxtft1[}{{{{1ndCvvuk0QCJhZzjnnLqX/(nCLJ;:+CczQdLtffmwr|xzqbYZZQYO<::>i>|                               "/        
  {u~~~~~~i!!:                       """,<-_?LLJUYXXzzzzXbCrjjpJ(((rdC|jr0wkwQYUQz,,_ttf0ZUCuvZdmZCCwpXtftzC<:,i>>_!                                <-       
   ++++~~-_~|L+~<~<~<><i                        """";Il<CMUYXzkXcccbJuunwk())jJ0f,,|rrLOpO0LUmqrfrzqp/jjrYOI::ii>)I                                  ]"      
       >r0w1)[-_+~~~~~-Qf~_-~~<<<<;                              ":vCUYUZUzczXm?,:cu()(()((fmXttfxqZ/fjfzLl,,>i><>                                   ;[      
                >{rY0r(/{_++++++-vr~]1~~~~~<i,,"                         "   " "lrXJJYXzzccwpvcczpOcttvYL>,,><<+<;"                                  "]      
                          ,<{fzrxu)_++++~~+(j+?j[~<<<<<l::,                          """"!)/tu0CJaYXXXYq!,,><<~?_>I,                    :,,[+~+~~~~>i<~,     
                                     ;~[tjzU)-_+__++_]/?_rr~~~~~<<!Il,                          "",,:+]i,,ii>?+]~!:                    I,"" ":~<l1|?~?[ !i!  
                                                :i{xLOr--_~+~~++??+/Q1~~<~~~<>ii,                        !<<<?[+l,                    l"""   ""  "     Iii;  
                                                           ~tYZqL[-_+~~~+-+_?}CJ-+++_-?_+~i              ;>+[}+l,                    I :, """   ""   "ii>I:  
                                                                      i)vL0f))}-----_--]fQ|])([[[?-_+>:",<_?[~;                     :        """ "" ";>iI;l  
                                                                                l?|uJcjnj]????-?][)cn}/jf)([>,                                     ";i>!l>!  
                                                                                          "!-)uzzUc}]?--+_]!                      :iii!I;:          ,i!!~_"  
                                                                                                     ,I>+!                        !ii>i>i>>i>>>i!ll";>![_"   
                                                                                                                                  <<~v?>>>>>>>>>>>i>><><     
                                                                                                                                    "]cQ)]]~~_c[<_<>>_<      
                                                                                                                                             ,-tv{1)[<       
`;

export default function NotFound() {
  return (
    <section className="w-full max-w-2xl mx-5 flex flex-col items-center justify-center">
      <Link className="mt-5 no-underline" href="/">
        <pre className="text-[3px] sm:text-[4px] md:text-[5px] font-mono">{asciiArt}</pre>
      </Link>
    </section>
  );
}
