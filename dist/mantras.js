'use strict';
// Complete verse units from traditional texts. Meanings and applications are editorial.
// A verse from a longer work is explicitly identified; it is not the entire hymn.
const MANTRA_TOPICS = [
  ['calm','Calm & anxiety','शान्ति और चिन्ता','peace stress worry overwhelmed nervous बेचैनी तनाव चिंता शांति'],
  ['courage','Courage & fear','साहस और भय','bravery confidence afraid insecurity डर हिम्मत आत्मविश्वास'],
  ['study','Study & focus','अध्ययन और एकाग्रता','learning exam exams concentration distraction school परीक्षा पढ़ाई ध्यान'],
  ['beginnings','New beginnings','नई शुरुआत','start morning work job interview change सुबह आरम्भ शुरुआत'],
  ['grief','Grief & loss','शोक और वियोग','sad sadness sorrow mourning death दुख दुःख उदासी शोक'],
  ['connection','Love & loneliness','प्रेम और अपनापन','love lonely belonging family friend अकेलापन प्यार परिवार'],
  ['anger','Anger & conflict','क्रोध और मतभेद','angry irritation resentment argument गुस्सा झगड़ा क्रोध'],
  ['gratitude','Gratitude & joy','कृतज्ञता और आनन्द','happy happiness thank abundance contentment खुशी धन्यवाद संतोष'],
  ['forgiveness','Forgiveness & regret','क्षमा और पश्चात्ताप','guilt shame mistake sorry पछतावा गलती अपराधबोध'],
  ['rest','Rest & sleep','विश्राम और निद्रा','night evening tired exhaustion insomnia नींद रात थकान'],
  ['wellbeing','Care & wellbeing','देखभाल और कल्याण','health illness sick healing care illness स्वास्थ्य बीमारी'],
  ['purpose','Purpose & choices','उद्देश्य और निर्णय','direction decision doubt confusion discipline habit meaning motivation उलझन निर्णय आदत आलस्य'],
  ['service','Compassion & service','करुणा और सेवा','kindness empathy teamwork community help दया सहयोग सहायता'],
  ['nature','Nature & belonging','प्रकृति और जुड़ाव','earth environment water food meal planet धरती पर्यावरण भोजन जल']
];
const MANTRA_SOURCES = {
  prayers:{name:'Prayers · VHPA compilation (2004)',url:'https://sanskritdocuments.org/doc_z_misc_general/prayers.pdf'},
  stuti:{name:'Stutisangraha · Sanskrit Documents',url:'https://sanskritdocuments.org/doc_deities_misc/devadevatAstutisangrahaH.html'},
  morning:{name:'Pratahsmaranam · Sanskrit Documents',url:'https://sanskritdocuments.org/doc_z_misc_misc/prAtahsmaranam.html'},
  isha:{name:'Isha Upanishad · Sanskrit Documents',url:'https://sanskritdocuments.org/doc_upanishhat/iisha.html'},
  shloka:{name:'Shloka collection 1 · Sanskrit Documents',url:'https://sanskritdocuments.org/doc_z_misc_general/shloka1.html'},
  gita:{name:'Gita Supersite · IIT Kanpur',url:'https://www.gitasupersite.iitk.ac.in/srimad?language=dv&field_chapter_value=4&field_nsutra_value=24&etsiva=1&htrskd=1'}
};
const MANTRAS = [
{id:'gayatri',title:'Gayatri mantra',saTitle:'गायत्री मन्त्र',kind:'Vedic mantra',topics:['study','purpose','beginnings'],source:'prayers',page:21,ref:'Rigveda 3.62.10 · with the customary Om and vyahriti preface',
sanskrit:`ॐ भूर्भुवः स्वः ।
तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।
धियो यो नः प्रचोदयात् ॥`,
en:'Om: earth, the atmosphere, and heaven. We contemplate the worthy radiance of the divine Savitr. May that radiance inspire and guide our understanding.',
hi:'ॐ: पृथ्वी, अन्तरिक्ष और स्वर्ग। हम देव सविता के वरणीय तेज का ध्यान करते हैं। वह प्रकाश हमारी बुद्धियों को प्रेरित और प्रकाशित करे।',
practice:'Before studying or making a decision, pause and ask what would help you see clearly.',practiceHi:'पढ़ाई या निर्णय से पहले रुककर पूछें: स्पष्ट समझ के लिए मुझे क्या जानना चाहिए?',note:'The Rigvedic verse begins with “tat savitur”. Om and the three vyahritis form the customary recitation preface; they are not part of Rigveda 3.62.10 itself.'},
{id:'mahamrityunjaya',title:'Mahamrityunjaya mantra',saTitle:'महामृत्युञ्जय मन्त्र',kind:'Vedic mantra',topics:['courage','grief','wellbeing'],source:'prayers',page:14,ref:'Rigveda 7.59.12 · traditional recitation with Om',
sanskrit:`ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।
उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥`,
en:'We worship the three-eyed one, fragrant and nourishing. Like a ripe cucumber released from its stem, may I be freed from death, but not from immortality.',
hi:'हम सुगन्धित और पोषण बढ़ाने वाले त्रिनेत्र का पूजन करते हैं। जैसे पका हुआ फल डंठल से मुक्त होता है, वैसे मैं मृत्यु के बन्धन से मुक्त होऊँ, अमृतत्व से नहीं।',
practice:'When fear rises, make room for it, then choose one caring action within your reach.',practiceHi:'भय उठने पर उसे स्वीकारें और अपने सामर्थ्य में देखभाल का एक काम चुनें।',note:'This is a prayer for release and immortality. It is not a promise that recitation prevents illness or death.'},
{id:'saha-navavatu',title:'May we learn together',saTitle:'सह नाववतु',kind:'Upanishadic mantra',topics:['study','connection','anger','service'],source:'prayers',page:21,ref:'Peace invocation used with Taittiriya and Katha Upanishad study',
sanskrit:`ॐ सह नाववतु । सह नौ भुनक्तु ।
सह वीर्यं करवावहै ।
तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'May we both be protected and nourished. May we work together with strength. May our learning be illuminating, and may we not hate one another. Om, peace, peace, peace.',
hi:'हम दोनों की रक्षा और पोषण हो। हम साथ मिलकर सामर्थ्य से कार्य करें। हमारा अध्ययन तेजस्वी हो और हम परस्पर द्वेष न करें। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Begin a study session or difficult conversation by agreeing to listen and work together.',practiceHi:'अध्ययन या कठिन बातचीत की शुरुआत सुनने और सहयोग करने के संकल्प से करें।'},
{id:'purnamadah',title:'A contemplation of wholeness',saTitle:'पूर्णमदः पूर्णमिदम्',kind:'Upanishadic mantra',topics:['calm','grief','gratitude'],source:'isha',ref:'Isha Upanishad · complete opening peace invocation',
sanskrit:`ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।
पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'That is whole; this is whole. From the whole, the whole emerges. When the whole is taken from the whole, the whole alone remains. Om, peace, peace, peace.',
hi:'वह पूर्ण है; यह पूर्ण है। पूर्ण से पूर्ण प्रकट होता है। पूर्ण में से पूर्ण लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Notice one source of meaning that is not measured by possessions or achievement.',practiceHi:'जीवन में अर्थ देने वाली ऐसी एक बात पहचानें जो उपलब्धि या सम्पत्ति पर निर्भर नहीं है।',note:'“Wholeness” here belongs to an Upanishadic contemplation of reality; it does not mean that painful events are good or should be ignored.'},
{id:'asato-ma',title:'From darkness toward light',saTitle:'असतो मा सद्गमय',kind:'Upanishadic mantra',topics:['purpose','grief','study'],source:'prayers',page:23,ref:'Brihadaranyaka Upanishad 1.3.28 · complete three-petition prayer',
sanskrit:`ॐ असतो मा सद्गमय ।
तमसो मा ज्योतिर्गमय ।
मृत्योर्मा अमृतं गमय ॥`,
en:'Lead me from the unreal to the real, from darkness to light, and from death to immortality.',
hi:'मुझे असत्य से सत्य की ओर, अन्धकार से प्रकाश की ओर और मृत्यु से अमृतत्व की ओर ले चलें।',
practice:'Name one thing you do not yet understand, and take a small step toward finding out.',practiceHi:'जिस बात को अभी नहीं समझते उसे पहचानें और उसे जानने की ओर एक छोटा कदम उठाएँ।',note:'All three petitions are included. They are the prayer within 1.3.28, not the entire surrounding prose passage.'},
{id:'sarve-bhavantu',title:'May everyone be well',saTitle:'सर्वे भवन्तु सुखिनः',kind:'Prayer verse',topics:['service','wellbeing','anger'],source:'prayers',page:22,ref:'Traditional welfare prayer · Peace Prayers (1)',
sanskrit:`ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।
सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'May all be happy and free from illness. May all encounter what is good; may no one have to share in suffering. Om, peace, peace, peace.',
hi:'सब सुखी हों, सब रोगमुक्त हों, सब शुभ देखें और कोई दुःख का भागी न हो। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Extend your concern beyond yourself: check in on someone who may need care.',practiceHi:'अपने से आगे बढ़कर किसी ऐसे व्यक्ति का हाल पूछें जिसे देखभाल की आवश्यकता हो।',note:'Cited as a traditional prayer in this anthology; no uncertain Upanishad attribution is asserted.'},
{id:'sarvesham',title:'Peace and fullness for all',saTitle:'सर्वेषां स्वस्तिर्भवतु',kind:'Prayer verse',topics:['calm','service','gratitude'],source:'prayers',page:22,ref:'Traditional peace prayer · Peace Prayers (1)',
sanskrit:`ॐ सर्वेषां स्वस्तिर्भवतु । सर्वेषां शान्तिर्भवतु ।
सर्वेषां पूर्णं भवतु । सर्वेषां मङ्गलं भवतु ।
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'May there be wellbeing for all, peace for all, fullness for all, and auspiciousness for all. Om, peace, peace, peace.',
hi:'सबका कल्याण हो, सबको शान्ति मिले, सबके जीवन में पूर्णता हो और सबका मंगल हो। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Let one ordinary interaction today leave the other person feeling more at ease.',practiceHi:'आज किसी सामान्य बातचीत में सामने वाले को थोड़ा अधिक सहज अनुभव कराएँ।'},
{id:'sangacchadhvam',title:'Walk and speak together',saTitle:'संगच्छध्वं संवदध्वम्',kind:'Vedic mantra',topics:['connection','anger','service'],source:'prayers',page:40,ref:'Rigveda 10.191.2 · complete verse',
sanskrit:`सं गच्छध्वं सं वदध्वं सं वो मनांसि जानताम् ।
देवा भागं यथा पूर्वे संजानाना उपासते ॥`,
en:'Come together, speak together, and let your minds understand together, as the gods of old, in agreement, attended to their allotted share.',
hi:'साथ चलो, साथ बोलो और तुम्हारे मन मिलकर समझें; जैसे प्राचीन देव सहमति से अपने भाग का अनुष्ठान करते थे।',
practice:'Before proposing a solution, invite everyone involved to describe the problem.',practiceHi:'समाधान देने से पहले सभी सम्बन्धित लोगों को समस्या बताने का अवसर दें।'},
{id:'samano-mantrah',title:'A shared intention',saTitle:'समानो मन्त्रः',kind:'Vedic mantra',topics:['service','connection','purpose'],source:'prayers',page:40,ref:'Rigveda 10.191.3 · complete verse',
sanskrit:`समानो मन्त्रः समितिः समानी समानं मनः सह चित्तमेषाम् ।
समानं मन्त्रमभि मन्त्रये वः समानेन वो हविषा जुहोमि ॥`,
en:'Let their deliberation be shared, their assembly united, and their minds and intentions in accord. I address a common counsel to you and offer a common oblation for you.',
hi:'उनका विचार साझा हो, सभा एकमत हो और मन तथा चित्त में सामंजस्य हो। मैं तुम्हें साझा मन्त्र सुनाता हूँ और तुम्हारे लिए समान हवि अर्पित करता हूँ।',
practice:'When working with others, write down the purpose you all agree on.',practiceHi:'मिलकर काम करते समय वह उद्देश्य लिखें जिस पर सबकी सहमति है।'},
{id:'samani-va-akutih',title:'Harmony of heart',saTitle:'समानी व आकूतिः',kind:'Vedic mantra',topics:['anger','connection','service'],source:'prayers',page:40,ref:'Rigveda 10.191.4 · complete verse',
sanskrit:`समानी व आकूतिः समाना हृदयानि वः ।
समानमस्तु वो मनो यथा वः सुसहासति ॥`,
en:'Let your intentions be in harmony, your hearts in accord, and your minds united, so that you may live well together.',
hi:'तुम्हारे संकल्प समान हों, हृदयों में सामंजस्य हो और मन एकमत हों, जिससे तुम साथ मिलकर सुखपूर्वक रह सको।',
practice:'In a disagreement, look for one shared need without pretending your differences have disappeared.',practiceHi:'मतभेद में एक साझा आवश्यकता खोजें; भिन्नताओं को दबाने की जरूरत नहीं है।'},
{id:'vakratunda',title:'Before a new beginning',saTitle:'वक्रतुण्ड महाकाय',kind:'Prayer verse',topics:['beginnings','courage'],source:'prayers',page:4,ref:'Traditional Ganesha invocation · complete verse',
sanskrit:`वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ ।
निर्विघ्नं कुरु मे देव शुभकार्येषु सर्वदा ॥`,
en:'O curved-trunked, great-bodied Lord, radiant as ten million suns: may my auspicious undertakings always proceed without obstacles.',
hi:'हे वक्र सूँड़ वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान प्रकाशमान देव! मेरे शुभ कार्य सदा निर्विघ्न करें।',
practice:'Before starting, identify one likely obstacle and prepare for it.',practiceHi:'नया काम शुरू करने से पहले एक सम्भावित बाधा पहचानें और उसकी तैयारी करें।',note:'Traditional recensions vary: this is the “surya-koti / shubha-karyeshu” form shown in the linked prayer book.'},
{id:'gurur-brahma',title:'Gratitude to the teacher',saTitle:'गुरुर्ब्रह्मा',kind:'Prayer verse',topics:['study','gratitude'],source:'shloka',ref:'Guru salutation · complete verse in Shloka collection 1',
sanskrit:`गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।
गुरुः साक्षात्परब्रह्म तस्मै श्रीगुरवे नमः ॥`,
en:'The guru is Brahma, Vishnu, and Maheshvara; the guru is the supreme Brahman itself. Salutations to that revered teacher.',
hi:'गुरु ब्रह्मा हैं, गुरु विष्णु हैं और गुरु महेश्वर हैं। गुरु साक्षात् परब्रह्म हैं; उन श्रीगुरु को प्रणाम है।',
practice:'Thank a teacher for a specific lesson, while continuing to question and understand for yourself.',practiceHi:'किसी शिक्षक को एक विशेष सीख के लिए धन्यवाद दें और स्वयं भी समझने तथा प्रश्न करने का अभ्यास रखें।'},
{id:'karagre',title:'Begin the day with intention',saTitle:'कराग्रे वसते लक्ष्मीः',kind:'Prayer verse',topics:['beginnings','gratitude','purpose'],source:'shloka',ref:'Morning hand-viewing prayer · Govinda recension',
sanskrit:`कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती ।
करमूले तु गोविन्दः प्रभाते करदर्शनम् ॥`,
en:'Lakshmi dwells at the fingertips, Sarasvati in the middle of the hands, and Govinda at their base. At dawn, I look upon my hands.',
hi:'हाथों के अग्रभाग में लक्ष्मी, मध्य में सरस्वती और मूल में गोविन्द का निवास माना गया है। प्रातः मैं अपने हाथों का दर्शन करता हूँ।',
practice:'Choose one useful thing your hands can do for someone today.',practiceHi:'आज अपने हाथों से किसी के लिए एक उपयोगी काम करने का संकल्प लें।'},
{id:'samudra-vasane',title:'Gratitude to the earth',saTitle:'समुद्रवसने देवि',kind:'Prayer verse',topics:['beginnings','nature','gratitude'],source:'shloka',ref:'Earth salutation · complete verse',
sanskrit:`समुद्रवसने देवि पर्वतस्तनमण्डले ।
विष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे ॥`,
en:'O Goddess whose garment is the ocean and whose breasts are the mountains, consort of Vishnu: I bow to you. Forgive the touch of my feet.',
hi:'हे समुद्ररूपी वस्त्र और पर्वतरूपी स्तन धारण करने वाली देवी, विष्णुपत्नी! आपको प्रणाम है; मेरे पैरों के स्पर्श को क्षमा करें।',
practice:'Let reverence for the earth become one act of care for the place you live.',practiceHi:'धरती के प्रति आदर को अपने आसपास की देखभाल के एक काम में बदलें।'},
{id:'shubham-karotu',title:'Light for the understanding',saTitle:'शुभं करोतु कल्याणम्',kind:'Prayer verse',topics:['rest','study','gratitude'],source:'stuti',ref:'Dipa-stuti · verse 2, complete anthology recension',
sanskrit:`शुभं करोतु कल्याणमारोग्यं सुखसम्पदाम् ।
मम बुद्धिप्रकाशं च दीपज्योति नमोऽस्तु ते ॥`,
en:'May the lamplight bring auspiciousness, wellbeing, health, happiness and abundance, and illumination to my understanding. Salutations to the light of the lamp.',
hi:'दीप का प्रकाश शुभता, कल्याण, आरोग्य, सुख-सम्पदा और मेरी बुद्धि में प्रकाश लाए। हे दीपज्योति, आपको प्रणाम है।',
practice:'At the end of the day, notice one thing you understand a little better.',practiceHi:'दिन के अन्त में एक ऐसी बात याद करें जिसे आज थोड़ा बेहतर समझा।',note:'This is the “mama buddhi-prakasham” variant in the linked anthology, not the separate “shatru-buddhi” recension.'},
{id:'dipo-jyotih',title:'A salutation to lamplight',saTitle:'दीपो ज्योतिः परं ब्रह्म',kind:'Prayer verse',topics:['rest','forgiveness','calm'],source:'stuti',ref:'Dipa-stuti · verse 1, complete',
sanskrit:`दीपो ज्योतिः परं ब्रह्म दीपो ज्योतिर्जनार्दनः ।
दीपो हरतु मे पापं सन्ध्यादीप नमोऽस्तुते ॥`,
en:'The light of the lamp is the supreme Brahman; its light is Janardana. May the lamp remove my wrongdoing. Salutations to the evening lamp.',
hi:'दीपज्योति परब्रह्म और जनार्दन का स्वरूप है। यह दीप मेरे पाप को दूर करे। हे सन्ध्या के दीप, आपको प्रणाम है।',
practice:'Reflect on one action you would like to improve tomorrow.',practiceHi:'अपने एक ऐसे व्यवहार पर विचार करें जिसे कल बेहतर करना चाहते हैं।'},
{id:'gange-yamune',title:'Reverence for water',saTitle:'गङ्गे च यमुने',kind:'Prayer verse',topics:['nature','gratitude','beginnings'],source:'prayers',page:7,ref:'Traditional water invocation · complete verse',
sanskrit:`गङ्गे च यमुने चैव गोदावरी सरस्वति ।
नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु ॥`,
en:'O Ganga, Yamuna, Godavari, Sarasvati, Narmada, Sindhu and Kaveri: be present in this water.',
hi:'हे गङ्गा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिन्धु और कावेरी! इस जल में अपनी उपस्थिति प्रदान करें।',
practice:'Use water thoughtfully and remember the people and ecosystems that depend on it.',practiceHi:'जल का सावधानी से उपयोग करें और उस पर निर्भर लोगों तथा प्रकृति को याद रखें।'},
{id:'sarasvati-namastubhyam',title:'At the beginning of study',saTitle:'सरस्वति नमस्तुभ्यम्',kind:'Prayer verse',topics:['study','beginnings'],source:'prayers',page:8,ref:'Traditional Sarasvati study prayer · complete verse',
sanskrit:`सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।
विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥`,
en:'Salutations to you, Sarasvati, giver of blessings, who assumes the form desired. I am beginning my learning; may it find fulfilment.',
hi:'हे सरस्वती, वर देने वाली और इच्छानुसार रूप धारण करने वाली देवी! आपको प्रणाम है। मैं अध्ययन आरम्भ कर रहा हूँ; मुझे सदा सिद्धि प्राप्त हो।',
practice:'Set one clear learning goal, then give it a short period of undivided attention.',practiceHi:'सीखने का एक स्पष्ट लक्ष्य चुनें और कुछ समय पूरा ध्यान उसी पर दें।'},
{id:'kara-charana',title:'An evening prayer for forgiveness',saTitle:'करचरणकृतम्',kind:'Prayer verse',topics:['forgiveness','rest'],source:'shloka',ref:'Prayer to Shiva · complete four-line verse',
sanskrit:`करचरणकृतं वाक्कायजं कर्मजं वा
श्रवणनयनजं वा मानसं वापराधम् ।
विहितमविहितं वा सर्वमेतत्क्षमस्व
जय जय करुणाब्धे श्रीमहादेव शम्भो ॥`,
en:'Forgive every offence arising through hands or feet, speech or body, action, hearing or sight, or the mind—whatever I have done, prescribed or otherwise. Glory to you, ocean of compassion, Mahadeva, Shambhu.',
hi:'हाथ-पैर, वाणी, शरीर, कर्म, कान, आँख या मन से जो भी अपराध हुआ हो, विहित हो या अविहित, उसे क्षमा करें। हे करुणासागर महादेव शम्भु, आपकी जय हो।',
practice:'Acknowledge a mistake without excuses and plan a practical repair.',practiceHi:'बिना बहाना बनाए एक गलती स्वीकारें और उसे सुधारने का ठोस उपाय सोचें।'},
{id:'manojavam',title:'Strength guided by self-command',saTitle:'मनोजवं मारुततुल्यवेगम्',kind:'Prayer verse',topics:['courage','study','purpose'],source:'stuti',ref:'Hanumat-stuti · verse 1, complete',
sanskrit:`मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।
वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शिरसा नमामि ॥`,
en:'I bow my head to Rama’s messenger: swift as thought and wind, master of the senses, foremost among the wise, son of the wind, and leader of the vanara host.',
hi:'मैं श्रीराम के दूत को सिर झुकाकर प्रणाम करता हूँ—जो मन और वायु के समान वेगवान, इन्द्रियों के विजेता, बुद्धिमानों में श्रेष्ठ, वायुपुत्र और वानर-समूह के प्रमुख हैं।',
practice:'Bring courage and restraint together: act firmly without acting impulsively.',practiceHi:'साहस को संयम से जोड़ें: दृढ़ होकर काम करें, आवेग में नहीं।'},
{id:'atulita-bala',title:'Power in the service of devotion',saTitle:'अतुलितबलधामम्',kind:'Prayer verse',topics:['courage','service','purpose'],source:'prayers',page:20,ref:'Hanuman salutation · Sanskrit invocation associated with Sundarakanda recitation',
sanskrit:`अतुलितबलधामं हेमशैलाभदेहं
दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् ।
सकलगुणनिधानं वानराणामधीशं
रघुपतिप्रियभक्तं वातजातं नमामि ॥`,
en:'I bow to the wind-born Hanuman, abode of incomparable strength, with a body like a golden mountain, fire to the forest of demons, foremost among the wise, treasury of virtues, lord of the vanaras and beloved devotee of Rama.',
hi:'मैं वायुपुत्र हनुमान को प्रणाम करता हूँ—अतुल बल के धाम, स्वर्णपर्वत जैसे शरीर वाले, दानवरूपी वन के लिए अग्नि, ज्ञानियों में अग्रगण्य, गुणों के भण्डार, वानरों के अधीश और राम के प्रिय भक्त।',
practice:'Ask how a strength you possess can help someone else today.',practiceHi:'सोचें कि आपकी कोई क्षमता आज किसी दूसरे के काम कैसे आ सकती है।'},
{id:'tvameva-mata',title:'A prayer of belonging',saTitle:'त्वमेव माता',kind:'Prayer verse',topics:['connection','grief','calm'],source:'stuti',ref:'Bhagavat-stuti · verse 1, complete',
sanskrit:`त्वमेव माता च पिता त्वमेव
त्वमेव बन्धुश्च सखा त्वमेव ।
त्वमेव विद्या द्रविणं त्वमेव
त्वमेव सर्वं मम देवदेव ॥`,
en:'You alone are my mother and father, my kin and friend. You are my knowledge and wealth; you are everything to me, O God of gods.',
hi:'आप ही मेरी माता और पिता हैं, आप ही बन्धु और मित्र हैं। आप ही विद्या और धन हैं; हे देवों के देव, आप ही मेरे लिए सब कुछ हैं।',
practice:'Let the prayer remind you of connection, then reach out to someone you trust.',practiceHi:'प्रार्थना से अपनेपन को याद करें और किसी विश्वसनीय व्यक्ति से सम्पर्क करें।'},
{id:'annapurne',title:'Nourishment and discernment',saTitle:'अन्नपूर्णे सदापूर्णे',kind:'Prayer verse',topics:['gratitude','nature','purpose'],source:'stuti',ref:'Annapurna-stuti · complete verse',
sanskrit:`अन्नपूर्णे सदापूर्णे शङ्करप्राणवल्लभे ।
ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति ॥`,
en:'O Annapurna, ever full, beloved of Shankara’s life, O Parvati: grant me alms for the attainment of knowledge and detachment.',
hi:'हे सदा पूर्ण अन्नपूर्णा, शङ्कर की प्राणप्रिय पार्वती! ज्ञान और वैराग्य की सिद्धि के लिए मुझे भिक्षा प्रदान करें।',
practice:'Before eating, remember both bodily nourishment and the understanding you want to cultivate.',practiceHi:'भोजन से पहले शरीर के पोषण और विकसित करने योग्य समझ, दोनों को याद करें।'},
{id:'ya-kundendu',title:'A prayer for clear understanding',saTitle:'या कुन्देन्दुतुषारहारधवला',kind:'Prayer verse',topics:['study','purpose'],source:'stuti',ref:'Mahasarasvati-stuti · verse 2, complete',
sanskrit:`या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता
या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।
या ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा वन्दिता
सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥`,
en:'May Sarasvati protect me: white as jasmine, moonlight and snow, clothed in white, her hands adorned with the vina, seated on a white lotus, honoured by Brahma, Vishnu, Shiva and other gods, removing all dullness of understanding.',
hi:'जैसी उज्ज्वलता कुन्द, चन्द्रमा और हिम की है, वैसी धवल, श्वेत वस्त्रों वाली, वीणा से सुशोभित हाथों वाली, श्वेत कमल पर विराजमान, ब्रह्मा-विष्णु-शिव आदि से वन्दित और समस्त जड़ता हरने वाली भगवती सरस्वती मेरी रक्षा करें।',
practice:'When something seems difficult, slow down and explain it in your own words.',practiceHi:'किसी कठिन विषय को धीरे पढ़ें और अपने शब्दों में समझाने का प्रयास करें।'},
{id:'shuklam-brahma',title:'Learning with courage and clarity',saTitle:'शुक्लां ब्रह्मविचारसारपरमाम्',kind:'Prayer verse',topics:['study','courage'],source:'stuti',ref:'Mahasarasvati-stuti · verse 1, complete',
sanskrit:`शुक्लां ब्रह्मविचारसारपरमामाद्यां जगद्व्यापिनीं
वीणापुस्तकधारिणीमभयदां जाड्यान्धकारापहाम् ।
हस्ते स्फाटिकमालिकां विदधतीं पद्मासने संस्थितां
वन्दे तां परमेश्वरीं भगवतीं बुद्धिप्रदां शारदाम् ॥`,
en:'I bow to Sharada, radiant and primordial, pervading the world and embodying the essence of inquiry into Brahman; bearing a vina, book and crystal rosary, seated on a lotus, granting fearlessness and understanding, dispelling the darkness of dullness.',
hi:'मैं उज्ज्वल, आद्य, जगत् में व्याप्त, ब्रह्मविचार की साररूपा शारदा को प्रणाम करता हूँ। वे वीणा, पुस्तक और स्फटिक माला धारण करती हैं, कमल पर बैठी हैं, अभय और बुद्धि देती हैं तथा जड़ता का अन्धकार दूर करती हैं।',
practice:'Treat not knowing as a starting point for inquiry, rather than a reason to stop.',practiceHi:'न जानने को रुकने का कारण नहीं, जिज्ञासा की शुरुआत मानें।'},
{id:'shantakaram',title:'Contemplate a peaceful presence',saTitle:'शान्ताकारं भुजगशयनम्',kind:'Prayer verse',topics:['calm','rest','courage'],source:'stuti',ref:'Vishnu-stuti · verse 3, complete',
sanskrit:`शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं
विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।
लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं
वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥`,
en:'I bow to Vishnu, peaceful in form, reclining upon the serpent, lotus-navelled, lord of the gods and support of the universe; vast as the sky, cloud-hued and beautiful, beloved of Lakshmi, lotus-eyed, known through yogic meditation, dispelling fear of worldly existence, lord of all worlds.',
hi:'मैं विष्णु को प्रणाम करता हूँ—शान्त स्वरूप, सर्पशय्या पर स्थित, कमलनाभि, देवेश, विश्व के आधार, आकाश जैसे व्यापक, मेघवर्ण, सुन्दर अंगों वाले, लक्ष्मीप्रिय, कमलनयन, योगियों के ध्यान में उपलब्ध, भवभय हरने वाले और सब लोकों के एकमात्र नाथ।',
practice:'Before responding to a stressful message, pause and settle your attention.',practiceHi:'तनावपूर्ण सन्देश का उत्तर देने से पहले रुकें और अपना ध्यान स्थिर करें।'},
{id:'karpura-gauram',title:'Compassion at the heart',saTitle:'कर्पूरगौरं करुणावतारम्',kind:'Prayer verse',topics:['calm','connection','service'],source:'stuti',ref:'Shiva-stuti · verse 1, complete',
sanskrit:`कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ।
सदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥`,
en:'I bow to Shiva together with Bhavani: white as camphor, compassion embodied, the essence of existence, wearing the serpent king as a garland, always dwelling in the lotus of the heart.',
hi:'मैं भवानी सहित शिव को प्रणाम करता हूँ—कर्पूर जैसे गौर, करुणा के अवतार, संसार के सार, सर्पराज का हार धारण करने वाले और हृदयकमल में सदा रहने वाले।',
practice:'Ask what a compassionate response would look like before you act.',practiceHi:'कर्म करने से पहले पूछें: इस स्थिति में करुणापूर्ण उत्तर क्या होगा?',note:'Presented as a traditional Shiva prayer; an unverified claim that it is a Yajurveda verse is not made.'},
{id:'rama-rameti',title:'Remembering Rama',saTitle:'राम रामेति',kind:'Prayer verse',topics:['rest','calm','connection'],source:'shloka',ref:'Rama-name verse · Vishnu Sahasranama concluding tradition',
sanskrit:`राम रामेति रामेति रमे रामे मनोरमे ।
सहस्रनाम तत्तुल्यं रामनाम वरानने ॥`,
en:'I delight in the beautiful name Rama, repeating “Rama, Rama, Rama.” O lovely-faced one, the name of Rama is said here to be equal to the thousand names.',
hi:'मैं “राम, राम, राम” कहते हुए मनोरम राम में रमण करता हूँ। हे सुन्दर मुख वाली! यहाँ रामनाम को सहस्रनाम के समान कहा गया है।',
practice:'Give your attention gently to the whole verse when your mind feels scattered.',practiceHi:'मन बिखरा लगे तो कोमलता से पूरे श्लोक पर ध्यान लौटाएँ।',note:'The equivalence to a thousand names is the verse’s devotional assertion, not a measured claim about results.'},
{id:'sarva-mangala',title:'Seeking refuge in the Goddess',saTitle:'सर्वमङ्गलमाङ्गल्ये',kind:'Prayer verse',topics:['courage','beginnings','wellbeing'],source:'shloka',ref:'Devi Mahatmya 11.10 · complete Narayani-stuti verse',
sanskrit:`सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।
शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥`,
en:'O auspiciousness of all that is auspicious, gracious one who accomplishes every purpose, refuge, three-eyed Gauri, Narayani: salutations to you.',
hi:'हे सभी मंगलों में मंगलमयी, कल्याणमयी, सभी प्रयोजनों को सिद्ध करने वाली, शरण देने वाली, त्रिनेत्रा गौरी नारायणी! आपको प्रणाम है।',
practice:'When you need reassurance, identify both a source of inner strength and a person who can help.',practiceHi:'आश्वासन की आवश्यकता हो तो अपने भीतर की शक्ति और सहायता देने वाले व्यक्ति, दोनों को पहचानें।'},
{id:'kayena-vacha',title:'Dedicate the work of your day',saTitle:'कायेन वाचा',kind:'Prayer verse',topics:['purpose','forgiveness','rest'],source:'prayers',page:17,ref:'Traditional Narayana dedication · complete first-person prayer form',
sanskrit:`कायेन वाचा मनसेन्द्रियैर्वा
बुद्ध्यात्मना वा प्रकृतेः स्वभावात् ।
करोमि यद्यत्सकलं परस्मै
नारायणायेति समर्पयामि ॥`,
en:'Whatever I do through body, speech, mind, senses, intellect or self, arising from my nature, I dedicate entirely to the supreme Narayana.',
hi:'शरीर, वाणी, मन, इन्द्रियों, बुद्धि या आत्मभाव से, स्वभाव के अनुसार मैं जो कुछ करता हूँ, वह सब परम नारायण को समर्पित करता हूँ।',
practice:'Choose an ordinary duty and perform it with care, without needing praise.',practiceHi:'एक सामान्य कर्तव्य को प्रशंसा की अपेक्षा के बिना, पूरी सावधानी से करें।',note:'This first-person liturgical form differs from the wording of Bhagavata Purana 11.2.36; it is cited here to the prayer book.'},
{id:'ramaya-ramabhadraya',title:'A salutation to Rama',saTitle:'रामाय रामभद्राय',kind:'Prayer verse',topics:['purpose','connection','courage'],source:'prayers',page:19,ref:'Rama prayer · complete verse',
sanskrit:`रामाय रामभद्राय रामचन्द्राय वेधसे ।
रघुनाथाय नाथाय सीतायाः पतये नमः ॥`,
en:'Salutations to Rama, Ramabhadra, Ramachandra, the wise one, lord of the Raghu lineage, our lord, and husband of Sita.',
hi:'राम, रामभद्र, रामचन्द्र, ज्ञानी प्रभु, रघुवंश के नाथ और सीता के पति को प्रणाम है।',
practice:'Think about a responsibility you can honour with steadiness today.',practiceHi:'आज जिस जिम्मेदारी को स्थिरता से निभा सकते हैं, उस पर विचार करें।'},
{id:'vasudeva-sutam',title:'Krishna, teacher of the world',saTitle:'वसुदेवसुतं देवम्',kind:'Prayer verse',topics:['study','gratitude','purpose'],source:'prayers',page:18,ref:'Krishna salutation · complete verse',
sanskrit:`वसुदेवसुतं देवं कंसचाणूरमर्दनम् ।
देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम् ॥`,
en:'I bow to Krishna, divine son of Vasudeva, vanquisher of Kamsa and Chanura, Devaki’s supreme joy, and teacher of the world.',
hi:'मैं वसुदेव के पुत्र, कंस और चाणूर का मर्दन करने वाले, देवकी के परम आनन्द, जगद्गुरु श्रीकृष्ण को प्रणाम करता हूँ।',
practice:'Return to a teaching you value and ask how to put it into practice.',practiceHi:'किसी प्रिय सीख को याद करें और पूछें कि उसे व्यवहार में कैसे लाएँ।'},
{id:'kararavindena',title:'Tenderness in remembrance',saTitle:'करारविन्देन पदारविन्दम्',kind:'Prayer verse',topics:['connection','gratitude','rest'],source:'stuti',ref:'Mukunda-stuti · complete verse',
sanskrit:`करारविन्देन पदारविन्दं मुखारविन्दे विनिवेशयन्तम् ।
वटस्य पत्रस्य पुटे शयानं बालं मुकुन्दं मनसा स्मरामि ॥`,
en:'In my mind I remember the child Mukunda, lying in the fold of a banyan leaf, taking his lotus-like foot in his lotus-like hand and placing it in his lotus-like mouth.',
hi:'मैं मन में बाल मुकुन्द का स्मरण करता हूँ, जो वटपत्र के पुट में लेटे हुए अपने कमल जैसे हाथ से कमल जैसे पैर को कमल जैसे मुख में रख रहे हैं।',
practice:'Let tenderness guide one interaction, especially when you are tired.',practiceHi:'विशेषकर थके होने पर किसी एक बातचीत में कोमलता बनाए रखें।'},
{id:'akashat-patitam',title:'Many offerings, one devotion',saTitle:'आकाशात्पतितं तोयम्',kind:'Prayer verse',topics:['connection','anger','service'],source:'stuti',ref:'Vishnu-stuti · verse 5, complete',
sanskrit:`आकाशात् पतितं तोयं यथा गच्छति सागरम् ।
सर्वदेवनमस्कारः केशवं प्रति गच्छति ॥`,
en:'As water falling from the sky goes to the ocean, every salutation to the gods goes to Keshava.',
hi:'जैसे आकाश से गिरा जल समुद्र में जाता है, वैसे सभी देवताओं को किया गया नमस्कार केशव तक पहुँचता है।',
practice:'Listen respectfully to a devotional practice different from your own.',practiceHi:'अपने से भिन्न उपासना-पद्धति को सम्मान से सुनें।',note:'This verse expresses a Vaishnava theological view; it is not presented as the only account accepted by every Hindu tradition.'},
{id:'namo-anantaya',title:'A salutation to the boundless',saTitle:'नमोऽस्त्वनन्ताय',kind:'Prayer verse',topics:['gratitude','calm','nature'],source:'stuti',ref:'Vishnu-stuti · verse 4, complete',
sanskrit:`नमोऽस्त्वनन्ताय सहस्रमूर्तये सहस्रपादाक्षिशिरोरुबाहवे ।
सहस्रनाम्ने पुरुषाय शाश्वते सहस्रकोटीयुगधारिणे नमः ॥`,
en:'Salutations to the infinite, with a thousand forms, feet, eyes, heads, thighs and arms; to the eternal person with a thousand names, who sustains countless ages.',
hi:'अनन्त, हजारों रूपों, पैरों, आँखों, सिरों, जाँघों और भुजाओं वाले, सहस्रनामधारी शाश्वत पुरुष और असंख्य युगों के आधार को प्रणाम है।',
practice:'Spend a moment noticing how much of life exists beyond the problem occupying your mind.',practiceHi:'क्षणभर देखें कि मन में चल रही समस्या से परे भी जीवन कितना व्यापक है।'},
{id:'vande-devam',title:'A refuge in Shiva',saTitle:'वन्दे देवमुमापतिम्',kind:'Prayer verse',topics:['courage','calm','connection'],source:'prayers',page:14,ref:'Shiva salutation · complete four-quarter verse',
sanskrit:`वन्दे देवमुमापतिं सुरगुरुं वन्दे जगत्कारणं
वन्दे पन्नगभूषणं मृगधरं वन्दे पशूनां पतिम् ।
वन्दे सूर्यशशाङ्कवह्निनयनं वन्दे मुकुन्दप्रियं
वन्दे भक्तजनाश्रयं च वरदं वन्दे शिवं शङ्करम् ॥`,
en:'I bow to Shiva, Uma’s lord and teacher of the gods, cause of the world, adorned with serpents, bearing a deer, lord of creatures; with sun, moon and fire as eyes, dear to Mukunda, refuge of devotees, bestower of blessings and bringer of wellbeing.',
hi:'मैं उमा के पति, देवगुरु, जगत् के कारण, सर्पाभूषणधारी, मृगधारी, प्राणियों के स्वामी शिव को प्रणाम करता हूँ। सूर्य, चन्द्र और अग्नि उनके नेत्र हैं; वे मुकुन्दप्रिय, भक्तों के आश्रय, वरदाता और कल्याणकारी हैं।',
practice:'Recall what helps you remain steady when circumstances feel uncertain.',practiceHi:'अनिश्चित परिस्थितियों में जो बात आपको स्थिर रखती है, उसे याद करें।'},
{id:'asita-giri',title:'Wonder beyond words',saTitle:'असितगिरिसमं स्यात्',kind:'Prayer verse',topics:['gratitude','study','nature'],source:'stuti',ref:'Shiva-stuti · verse 2, complete',
sanskrit:`असितगिरिसमं स्यात्कज्जलं सिन्धुपात्रे
सुरतरुवरशाखा लेखनी पत्रमुर्वी ।
लिखति यदि गृहीत्वा शारदा सर्वकालं
तदपि तव गुणानामीश पारं न याति ॥`,
en:'If ink were as vast as a dark mountain, the ocean its vessel, a celestial tree branch the pen, and the earth the page, even Sharada writing for all time would not reach the end of your qualities, O Lord.',
hi:'काले पर्वत जितनी स्याही हो, समुद्र उसका पात्र, कल्पवृक्ष की शाखा लेखनी और पृथ्वी कागज हो; शारदा अनन्तकाल तक लिखें, तब भी हे ईश, आपके गुणों का अन्त न पा सकें।',
practice:'Make room for wonder without needing to explain everything immediately.',practiceHi:'हर बात का तुरन्त उत्तर खोजे बिना विस्मय के लिए भी स्थान रखें।'},
{id:'panduranga',title:'A gentle presence',saTitle:'समचरणसरोजम्',kind:'Prayer verse',topics:['connection','calm','rest'],source:'stuti',ref:'Panduranga-stuti · complete verse',
sanskrit:`समचरणसरोजं सान्द्रनीलाम्बुदाभं
जघननिहितपाणिं मण्डनं मण्डनानाम् ।
तरुणतुलसिमालाकन्धरं कञ्जनेत्रं
सदयधवलहासं विट्ठलं चिन्तयामि ॥`,
en:'I contemplate Vitthala, his lotus feet placed evenly, dark as a rain cloud, hands on his hips, ornament of ornaments, wearing a fresh tulsi garland, lotus-eyed, with a bright compassionate smile.',
hi:'मैं विट्ठल का चिन्तन करता हूँ—समान रूप से रखे कमल जैसे चरण, घने मेघ जैसा वर्ण, कमर पर हाथ, आभूषणों के आभूषण, ताजी तुलसी की माला, कमलनयन और करुणापूर्ण उज्ज्वल मुस्कान।',
practice:'Bring a little warmth to your tone when speaking to yourself or someone else.',practiceHi:'अपने या दूसरे के साथ बात करते समय वाणी में थोड़ी आत्मीयता लाएँ।'},
{id:'jayanti-mangala',title:'Remembering the names of Devi',saTitle:'जयन्ती मङ्गला काली',kind:'Prayer verse',topics:['courage','forgiveness','beginnings'],source:'stuti',ref:'Shodasha-matrika-stuti · verse 2 in the anthology, complete',
sanskrit:`जयन्ती मङ्गला काली भद्रकाली कपालिनी ।
दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥`,
en:'Salutations to you as Jayanti, Mangala, Kali, Bhadrakali, Kapalini, Durga, forgiveness, auspiciousness, sustainer, Svaha and Svadha.',
hi:'जयन्ती, मङ्गला, काली, भद्रकाली, कपालिनी, दुर्गा, क्षमा, शिवा, धात्री, स्वाहा और स्वधा रूपिणी देवी को प्रणाम है।',
practice:'Hold courage and forgiveness together when beginning again after a setback.',practiceHi:'असफलता के बाद फिर शुरू करते समय साहस और क्षमा, दोनों को साथ रखें।'},
{id:'brahma-murari',title:'An auspicious morning',saTitle:'ब्रह्मा मुरारिः',kind:'Prayer verse',topics:['beginnings','gratitude'],source:'morning',ref:'Pratahsmaranam · verse 4, complete',
sanskrit:`ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च ।
गुरुश्च शुक्रः शनिराहुकेतवः कुर्वन्तु सर्वे मम सुप्रभातम् ॥`,
en:'May Brahma, Vishnu and Shiva, the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu all make my morning auspicious.',
hi:'ब्रह्मा, मुरारि, त्रिपुरान्तकारी शिव, सूर्य, चन्द्रमा, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु—ये सब मेरी प्रभात को शुभ करें।',
practice:'Begin the morning by choosing an intention before opening your messages.',practiceHi:'सुबह सन्देश देखने से पहले दिन के लिए एक संकल्प चुनें।',note:'This prayer invokes deities and the traditional navagraha. No horoscope or predicted planetary effect is implied.'},
{id:'prithvi-sagandha',title:'Wake to the elements',saTitle:'पृथ्वी सगन्धा',kind:'Prayer verse',topics:['beginnings','nature','gratitude'],source:'morning',ref:'Pratahsmaranam · verse 7, complete',
sanskrit:`पृथ्वी सगन्धा सरसास्तथापः स्पर्शी च वायुर्ज्वलनं च तेजः ।
नभः सशब्दं महता सहैव कुर्वन्तु सर्वे मम सुप्रभातम् ॥`,
en:'May earth with fragrance, water with taste, air with touch, shining fire, and space with sound, together with the great cosmic principle, make my morning auspicious.',
hi:'सुगन्ध वाली पृथ्वी, रसयुक्त जल, स्पर्श वाला वायु, प्रकाशमान अग्नि और शब्दयुक्त आकाश, महत्तत्त्व के साथ मेरी प्रभात को शुभ करें।',
practice:'Notice the sensory world around you before rushing into the day.',practiceHi:'दिन की भागदौड़ से पहले आसपास के स्पर्श, ध्वनि, प्रकाश और गन्ध को ध्यान से अनुभव करें।'},
{id:'vasundhara',title:'Tread gently',saTitle:'नमोऽस्तु प्रियदत्तायै',kind:'Prayer verse',topics:['nature','forgiveness','gratitude'],source:'morning',ref:'Pratahsmaranam · verse 3, complete',
sanskrit:`नमोऽस्तु प्रियदत्तायै तुभ्यं देवि वसुन्धरे ।
त्वं माता सर्वलोकानां पादन्यासं क्षमस्व मे ॥`,
en:'Salutations to you, giving what is dear, O Goddess Earth. You are the mother of all worlds; forgive my placing my feet upon you.',
hi:'हे प्रिय वस्तुएँ देने वाली देवी वसुन्धरा, आपको प्रणाम है। आप समस्त लोकों की माता हैं; मेरे पैर रखने को क्षमा करें।',
practice:'Ask how you can reduce one unnecessary burden on the environment.',practiceHi:'सोचें कि पर्यावरण पर पड़ने वाला एक अनावश्यक बोझ कैसे कम कर सकते हैं।'},
{id:'brahmarpanam',title:'An offering before a meal',saTitle:'ब्रह्मार्पणं ब्रह्म हविः',kind:'Gita verse',topics:['gratitude','nature','purpose'],source:'gita',ref:'Bhagavad Gita · adhyaya 4, shloka 24 · complete verse',
sanskrit:`ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।
ब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना ॥`,
en:'The offering instrument is Brahman; the offering is Brahman, offered by Brahman into the fire of Brahman. Brahman is reached by one absorbed in action as Brahman.',
hi:'अर्पण का साधन ब्रह्म है, हवि ब्रह्म है और ब्रह्म द्वारा ब्रह्मरूपी अग्नि में अर्पित है। ब्रह्मरूप कर्म में समाधिस्थ व्यक्ति ब्रह्म को ही प्राप्त करता है।',
practice:'Before a meal, acknowledge the many forms of labour and life that made it possible.',practiceHi:'भोजन से पहले उसे सम्भव बनाने वाले श्रम और जीवन के अनेक रूपों को याद करें।',note:'Often recited before meals; in the Gita it appears within the teaching on sacrifice and knowledge. The meaning here is editorial; the Gita reader also provides named translations.'},
{id:'isha-1',title:'Enjoy without grasping',saTitle:'ईशा वास्यमिदं सर्वम्',kind:'Upanishadic mantra',topics:['gratitude','purpose','nature'],source:'isha',ref:'Isha Upanishad · mantra 1, complete',
sanskrit:`ॐ ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।
तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥ १ ॥`,
en:'All this, whatever moves in this moving world, is to be enveloped by the Lord. Through renunciation, enjoy or protect yourself; do not covet anyone’s wealth.',
hi:'इस जगत् में जो कुछ भी गतिशील है, सब ईश्वर से आवृत है। त्याग के द्वारा भोग करो अथवा अपनी रक्षा करो; किसी के धन का लोभ न करो।',
practice:'Notice what is enough for today before reaching for something more.',practiceHi:'और अधिक पाने की ओर बढ़ने से पहले देखें कि आज के लिए पर्याप्त क्या है।',note:'“Bhunjīthā” is interpreted differently by commentators, including “enjoy” and “protect yourself”; the meaning preserves this difference.'},
{id:'isha-2',title:'A life of responsible action',saTitle:'कुर्वन्नेवेह कर्माणि',kind:'Upanishadic mantra',topics:['purpose','beginnings'],source:'isha',ref:'Isha Upanishad · mantra 2, complete',
sanskrit:`कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः ।
एवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥ २ ॥`,
en:'Doing actions here, one should wish to live a hundred years. For you, there is no other way than this by which action does not cling to a person.',
hi:'यहाँ कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इसके अतिरिक्त ऐसा कोई मार्ग नहीं जिससे कर्म मनुष्य को लिप्त न करे।',
practice:'Take up one responsibility with care instead of waiting for perfect motivation.',practiceHi:'पूर्ण प्रेरणा की प्रतीक्षा किए बिना एक जिम्मेदारी को सावधानी से निभाएँ।',note:'Read with the surrounding Upanishad and its commentaries; this is not a prediction of lifespan.'},
{id:'isha-5',title:'Near and far',saTitle:'तदेजति तन्नैजति',kind:'Upanishadic mantra',topics:['calm','purpose','nature'],source:'isha',ref:'Isha Upanishad · mantra 5, complete',
sanskrit:`तदेजति तन्नैजति तद्दूरे तद्वन्तिके ।
तदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः ॥ ५ ॥`,
en:'That moves, and that does not move. That is far, and that is near. That is within all this, and that is also outside all this.',
hi:'वह चलता है और नहीं भी चलता; वह दूर है और निकट भी। वह इन सबके भीतर है और इन सबके बाहर भी।',
practice:'Sit with a question for a moment without forcing an immediate answer.',practiceHi:'किसी प्रश्न का तुरन्त उत्तर थोपे बिना थोड़ी देर उसके साथ ठहरें।',note:'The paradox describes the Self or ultimate reality, not the motion of a physical object.'},
{id:'isha-6',title:'See yourself in others',saTitle:'यस्तु सर्वाणि भूतानि',kind:'Upanishadic mantra',topics:['anger','connection','service'],source:'isha',ref:'Isha Upanishad · mantra 6, complete',
sanskrit:`यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति ।
सर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥ ६ ॥`,
en:'One who sees all beings in the Self, and the Self in all beings, does not recoil from them.',
hi:'जो सभी प्राणियों को आत्मा में और आत्मा को सभी प्राणियों में देखता है, वह उनसे घृणा या विमुखता नहीं करता।',
practice:'Before judging someone, consider a human need you may share with them.',practiceHi:'किसी का मूल्यांकन करने से पहले एक ऐसी मानवीय आवश्यकता सोचें जो आप दोनों में समान हो।'},
{id:'isha-7',title:'A contemplation beyond separation',saTitle:'यस्मिन्सर्वाणि भूतानि',kind:'Upanishadic mantra',topics:['grief','connection','calm'],source:'isha',ref:'Isha Upanishad · mantra 7, complete',
sanskrit:`यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः ।
तत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥ ७ ॥`,
en:'For the knower in whom all beings have become the Self, what delusion or sorrow remains when that oneness is seen?',
hi:'जिस ज्ञानी के लिए सभी प्राणी आत्मा ही हो गए हैं और जो एकत्व देखता है, उसके लिए मोह और शोक कहाँ रह जाते हैं?',
practice:'When grieving, allow your feelings and remember a relationship that still gives your life meaning.',practiceHi:'शोक में अपनी भावनाओं को स्थान दें और जीवन को अर्थ देने वाले किसी सम्बन्ध को याद करें।',note:'The verse describes spiritual realization; it is not a demand that a grieving person stop feeling sorrow.'},
{id:'isha-15',title:'A prayer to see what is true',saTitle:'हिरण्मयेन पात्रेण',kind:'Upanishadic mantra',topics:['study','purpose'],source:'isha',ref:'Isha Upanishad · mantra 15, complete',
sanskrit:`हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् ।
तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥ १५ ॥`,
en:'The face of truth is hidden by a golden vessel. O Pushan, uncover it so that one devoted to truth may see.',
hi:'सत्य का मुख स्वर्णमय पात्र से ढका है। हे पूषन्, सत्यधर्म का अनुसरण करने वाले के दर्शन के लिए उसे हटा दें।',
practice:'Distinguish what looks impressive from what the evidence actually supports.',practiceHi:'जो बात आकर्षक दिखती है और जिसे प्रमाण समर्थन देते हैं, उनमें अन्तर करें।'},
{id:'agne-naya',title:'Lead us on a good path',saTitle:'अग्ने नय सुपथा',kind:'Upanishadic mantra',topics:['purpose','forgiveness','beginnings'],source:'isha',ref:'Isha Upanishad · mantra 18, complete; also Rigveda 1.189.1',
sanskrit:`अग्ने नय सुपथा राये अस्मान्
विश्वानि देव वयुनानि विद्वान् ।
युयोध्यस्मज्जुहुराणमेनो
भूयिष्ठां ते नमौक्तिं विधेम ॥ १८ ॥`,
en:'O Agni, knowing all our ways, lead us by the good path to wellbeing. Keep crooked wrongdoing far from us. We offer you abundant words of homage.',
hi:'हे अग्निदेव, सभी मार्गों को जानने वाले! हमें अच्छे पथ से कल्याण की ओर ले चलें। हमसे कुटिल पाप दूर करें। हम आपको भरपूर नमस्कार अर्पित करते हैं।',
practice:'When choosing a next step, ask whether you could explain it honestly to someone you respect.',practiceHi:'अगला कदम चुनते समय पूछें कि क्या उसे किसी आदरणीय व्यक्ति के सामने ईमानदारी से समझा सकेंगे।'},
{id:'dyauh-shantih',title:'Peace throughout the world',saTitle:'द्यौः शान्तिः',kind:'Vedic mantra',topics:['calm','nature','service'],source:'prayers',page:24,ref:'Shukla Yajurveda 36.17 · complete peace mantra with closing invocation',
sanskrit:`ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।
वनस्पतयः शान्तिर्विश्वे देवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'Peace in heaven, the atmosphere, the earth, the waters and the herbs; peace in the trees, all the gods, and Brahman. May all be peace, peace itself be peace, and may that peace come to me. Om, peace, peace, peace.',
hi:'द्युलोक, अन्तरिक्ष, पृथ्वी, जल और औषधियों में शान्ति हो; वनस्पतियों, सभी देवताओं और ब्रह्म में शान्ति हो। सब शान्त हो, शान्ति भी शान्तिमयी हो और वह शान्ति मुझे प्राप्त हो। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Link your wish for personal peace with one action that reduces harm around you.',practiceHi:'अपनी शान्ति की कामना को आसपास की हानि घटाने वाले एक काम से जोड़ें।'},
{id:'sham-no-mitrah',title:'Truthfulness in learning',saTitle:'शं नो मित्रः',kind:'Upanishadic mantra',topics:['study','purpose','service'],source:'prayers',page:26,ref:'Taittiriya Upanishad 1.1.1 · complete opening peace invocation',
sanskrit:`ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा ।
शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः ।
नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि ।
त्वामेव प्रत्यक्षं ब्रह्म वदिष्यामि । ऋतं वदिष्यामि । सत्यं वदिष्यामि ।
तन्मामवतु । तद्वक्तारमवतु । अवतु माम् । अवतु वक्तारम् ।
ॐ शान्तिः शान्तिः शान्तिः ॥`,
en:'May Mitra, Varuna, Aryaman, Indra, Brihaspati and wide-striding Vishnu be favourable to us. Salutations to Brahman and to you, Vayu: you are directly manifest Brahman. I shall declare you as such; I shall speak what is right and true. May that protect me and the teacher. Om, peace, peace, peace.',
hi:'मित्र, वरुण, अर्यमा, इन्द्र, बृहस्पति और व्यापक गति वाले विष्णु हमारे लिए कल्याणकारी हों। ब्रह्म को नमस्कार; वायु, आपको नमस्कार—आप प्रत्यक्ष ब्रह्म हैं। मैं आपको प्रत्यक्ष ब्रह्म कहूँगा; ऋत और सत्य बोलूँगा। वह मेरी और वक्ता की रक्षा करे। ॐ शान्ति, शान्ति, शान्ति।',
practice:'Make intellectual honesty part of study: say clearly what you know and what you do not.',practiceHi:'अध्ययन में ईमानदारी रखें: जो जानते हैं और जो नहीं जानते, उसे स्पष्ट कहें।'},
{id:'shuklambaradharam',title:'A serene beginning',saTitle:'शुक्लाम्बरधरम्',kind:'Prayer verse',topics:['beginnings','calm','study'],source:'prayers',page:16,ref:'Traditional opening invocation · complete verse',
sanskrit:`शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् ।
प्रसन्नवदनं ध्यायेत्सर्वविघ्नोपशान्तये ॥`,
en:'One should meditate on the white-clad, all-pervading one, moon-coloured, four-armed and serene-faced, for the calming of all obstacles.',
hi:'सभी विघ्नों की शान्ति के लिए श्वेत वस्त्रधारी, सर्वव्यापी, चन्द्रमा जैसे वर्ण वाले, चार भुजाओं वाले और प्रसन्न मुख वाले का ध्यान करें।',
practice:'Prepare a calm workspace before beginning a demanding task.',practiceHi:'कठिन काम आरम्भ करने से पहले कार्यस्थल को शान्त और व्यवस्थित करें।',note:'Used as a Ganesha invocation in the linked book and also in Vishnu Sahasranama recitation traditions. “Vishnum” can express all-pervasiveness; devotional identification varies.'},
{id:'rama-charanau',title:'Gather thought, speech and action',saTitle:'श्रीरामचन्द्रचरणौ',kind:'Prayer verse',topics:['rest','connection','purpose'],source:'prayers',page:19,ref:'Rama remembrance · complete four-line verse',
sanskrit:`श्रीरामचन्द्रचरणौ मनसा स्मरामि
श्रीरामचन्द्रचरणौ वचसा गृणामि ।
श्रीरामचन्द्रचरणौ शिरसा नमामि
श्रीरामचन्द्रचरणौ शरणं प्रपद्ये ॥`,
en:'I remember the feet of Sri Ramachandra in my mind, praise them with my words, bow to them with my head, and take refuge at them.',
hi:'मैं मन से श्रीरामचन्द्र के चरणों का स्मरण करता हूँ, वाणी से उनका गुणगान करता हूँ, सिर झुकाकर उन्हें प्रणाम करता हूँ और उनकी शरण ग्रहण करता हूँ।',
practice:'Notice whether your thoughts, words and actions express the same intention.',practiceHi:'देखें कि आपके विचार, वाणी और कर्म एक ही संकल्प को व्यक्त करते हैं या नहीं।'}
];

// Orthographic IAST transliteration. Pitch accents are deliberately not synthesized.
function mantraRomanize(text) {
  const vowels={'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ॡ':'ḹ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
  const marks={'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const consonants={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḻ'};
  const symbols={'ं':'ṃ','ँ':'m̐','ः':'ḥ','ऽ':'’','ॐ':'oṃ','।':'|','॥':'||','ꣳ':'ṃ','०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'};
  const chars=Array.from(text);let out='';
  for(let i=0;i<chars.length;i++){const c=chars[i],next=chars[i+1];if(consonants[c]){out+=consonants[c];if(next==='्')i++;else if(marks[next])out+=marks[chars[++i]];else out+='a';}else out+=vowels[c]??symbols[c]??c;}
  return out;
}
MANTRAS.forEach(m=>{m.roman=mantraRomanize(m.sanskrit);m.url=MANTRA_SOURCES[m.source].url+(m.page?'#page='+m.page:'');});
SOURCES.push({type:'MANTRAS & PRAYERS',title:'Traditional texts, with their locations',detail:'The Mantras section contains 54 complete selected passages, with individual links to Sanskrit Documents transcriptions, the 2004 VHPA prayer anthology, and IIT Kanpur’s Gita Supersite. It distinguishes Vedic and Upanishadic mantras from devotional prayer verses. Hindi and English meanings, feeling categories and daily applications are editorial. A selected verse is not presented as a complete longer hymn. Variant readings and uncertain attributions are identified where relevant.',url:'https://sanskritdocuments.org/doc_deities_misc/devadevatAstutisangrahaH.html'});
